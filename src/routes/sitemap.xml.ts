import type { RequestEvent } from "@sveltejs/kit";
import { compileStages } from "$lib/curriculum";

export function GET({ url }: RequestEvent) {
  const origin = url.origin;
  const lessons = compileStages()
    .map((l) => `<url><loc>${origin}/lessons/${l.id}</loc></url>`)
    .join("");
  const pages = ["/", "/lessons", "/review", "/settings"]
    .map((p) => `<url><loc>${origin}${p}</loc></url>`)
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages}
${lessons}
</urlset>`;
  return new Response(xml, {
    headers: { "content-type": "application/xml" },
  });
}
