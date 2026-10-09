import { ImageResponse } from "next/og";

export const alt = "Ayoub Wahid — Shopify Expert & Full-Stack / AI Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#F4EFE6", color: "#141414", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, letterSpacing: 2 }}>
          <span>CASABLANCA, MOROCCO</span>
          <span style={{ background: "#D9572B", padding: "8px 22px", borderRadius: 999 }}>Available for new projects</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 210, fontWeight: 900, lineHeight: 0.9, letterSpacing: -6 }}>AYOUB WAHID</div>
          <div style={{ fontSize: 38, marginTop: 24, display: "flex" }}>Shopify stores that sell. AI agents that work. Apps made for production.</div>
        </div>
        <div style={{ position: "absolute", right: -80, bottom: -80, width: 320, height: 320, borderRadius: 999, background: "#E7DCC8", display: "flex" }} />
        <div style={{ position: "absolute", right: 60, bottom: 60, width: 120, height: 120, borderRadius: 999, background: "#D9572B", display: "flex" }} />
      </div>
    ),
    size
  );
}
