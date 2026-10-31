import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export async function GET(
  _: Request,
  { params }: { params: Promise<{ weight: string }> },
) {
  const { weight } = await params;
  if (!["regular", "bold"].includes(weight))
    return new Response("Not found", { status: 404 });
  const file = path.join(
    process.cwd(),
    "node_modules",
    "pretendard",
    "dist",
    "public",
    "static",
    "alternative",
    `Pretendard-${weight === "bold" ? "Bold" : "Regular"}.ttf`,
  );
  const data = await readFile(file);
  return new Response(data, {
    headers: {
      "Content-Type": "font/ttf",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
