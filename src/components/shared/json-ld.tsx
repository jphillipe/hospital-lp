/**
 * Serializes server data into a `application/ld+json` block.
 *
 * `<` is escaped rather than left as-is: a `</script>` sequence anywhere in the
 * data — a description, a name — would close the tag early and the rest of the
 * JSON would be parsed as markup. `<` is valid JSON and parsers read it
 * back as `<`, so escaping costs nothing.
 */
export function JsonLd({ data }: { readonly data: unknown }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
