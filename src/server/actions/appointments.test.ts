import { describe, expect, it } from "vitest";

import { UNSURE_SERVICE, initialAppointmentState } from "@/lib/booking";
import { requestAppointment } from "@/server/actions/appointments";

const form = (fields: Readonly<Record<string, string>>): FormData => {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) data.append(key, value);
  return data;
};

const complete = {
  service: "primary-care",
  fullName: "Rita Alves",
  phone: "(508) 555-0142",
  callback: "morning",
} as const;

const submit = (fields: Readonly<Record<string, string>>) =>
  requestAppointment(initialAppointmentState, form(fields));

describe("requestAppointment", () => {
  it("accepts a complete request", async () => {
    const state = await submit(complete);

    expect(state.status).toBe("sent");
  });

  it("reports that nothing was delivered while no scheduler is connected", async () => {
    const state = await submit(complete);

    // The gate on `booking.confirmation.pendingNotice`. When the seam in
    // `appointments.ts` is wired up this flips and the notice disappears.
    expect(state).toStrictEqual({ status: "sent", delivered: false });
  });

  it("accepts the visitor who does not know which service they need", async () => {
    const state = await submit({ ...complete, service: UNSURE_SERVICE });

    expect(state.status).toBe("sent");
  });

  it("returns one message per bad field, and what was typed", async () => {
    const state = await submit({
      service: "primary-care",
      fullName: "",
      phone: "nope",
      callback: "",
      schedulingNotes: "Tuesdays suit me",
    });

    expect(state.status).toBe("invalid");
    if (state.status !== "invalid") return;

    expect(Object.keys(state.errors).sort()).toStrictEqual([
      "callback",
      "fullName",
      "phone",
    ]);
    // Nothing typed is lost on a rejected submit.
    expect(state.values.schedulingNotes).toBe("Tuesdays suit me");
    expect(state.values.service).toBe("primary-care");
  });

  it("rejects a service slug the practice does not offer", async () => {
    const state = await submit({ ...complete, service: "cardiology" });

    expect(state.status).toBe("invalid");
    if (state.status !== "invalid") return;
    expect(state.errors.service).toBeDefined();
  });

  it("carries a real clinician through", async () => {
    const state = await submit({ ...complete, doctor: "leila-haddad" });

    expect(state.status).toBe("sent");
  });

  /**
   * A stale `?doctor=` is dropped rather than bounced. Nobody typed it — it
   * came off a card — so an out-of-date link is ours to fix, not a reason to
   * refuse a request that is otherwise complete.
   */
  it("drops an unknown clinician instead of refusing the request", async () => {
    const state = await submit({ ...complete, doctor: "nobody-here" });

    expect(state.status).toBe("sent");
  });
});
