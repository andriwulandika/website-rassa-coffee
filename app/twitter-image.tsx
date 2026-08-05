import { ImageResponse } from "next/og";
import { OgImage, size, contentType } from "@/lib/og-image";

export const runtime = "nodejs";
export const alt = "Rassa Coffee - Kutacane, Aceh Tenggara";
export { size, contentType };

export default function Image() {
  return new ImageResponse(<OgImage />, { ...size });
}
