import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0b0f",
          color: "#e4e4e7",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 32, color: "#a1a1aa" }}>
          <div style={{ width: 20, height: 20, borderRadius: 6, background: "#f5904d" }} />
          Keploy × Go tutorial
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, color: "#ffffff" }}>{site.title}</div>
          <div style={{ fontSize: 34, color: "#a1a1aa" }}>
            Record real traffic from a Gorilla Mux API. Replay it as tests. No hand-written mocks.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#f5904d", fontFamily: "monospace" }}>
          keploy record → keploy test
        </div>
      </div>
    ),
    size,
  );
}
