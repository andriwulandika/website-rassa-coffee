import fs from "node:fs";
import path from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function toDataUri(relativePath: string, mime: string) {
  const filePath = path.join(process.cwd(), "public", relativePath);
  const base64 = fs.readFileSync(filePath).toString("base64");
  return `data:${mime};base64,${base64}`;
}

export function OgImage() {
  const background = toDataUri("images/hero-interior.jpeg", "image/jpeg");
  const logo = toDataUri("images/logo.jpeg", "image/jpeg");

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={background}
        alt=""
        width={1200}
        height={630}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage:
            "linear-gradient(90deg, rgba(46,32,22,0.95) 0%, rgba(60,42,29,0.9) 35%, rgba(111,78,55,0.55) 65%, rgba(111,78,55,0.25) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100%",
          padding: "0 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logo}
          alt=""
          width={110}
          height={110}
          style={{ borderRadius: 24 }}
        />
        <div
          style={{
            marginTop: 36,
            fontSize: 68,
            fontWeight: 700,
            color: "#FFF8F0",
            lineHeight: 1.1,
            display: "flex",
          }}
        >
          Rassa Coffee
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 32,
            color: "#D4A574",
            fontWeight: 600,
            display: "flex",
          }}
        >
          Kopi Premium, Cerita Kutacane
        </div>
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            color: "#FFF8F0",
            opacity: 0.85,
            display: "flex",
          }}
        >
          Coffee Shop &amp; B2B Supplier — Kutacane, Aceh Tenggara
        </div>
      </div>
    </div>
  );
}
