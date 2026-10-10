// Server component that emits a JSON-LD <script> tag. Safe to use in layouts
// and pages (no client JS needed).
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; we control the data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
