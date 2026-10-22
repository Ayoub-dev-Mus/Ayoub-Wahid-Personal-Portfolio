import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#141414", color: "#D9572B", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 900, borderRadius: 16, letterSpacing: -2 }}>
        AW
      </div>
    ),
    size
  );
}
