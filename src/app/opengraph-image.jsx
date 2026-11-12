import { ImageResponse } from "next/og";

export const alt = "Element Vertex: one team for every business function";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social share card, generated at build time in the brand colours. */
export default function OpenGraphImage() {
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
          background: "#01010D",
          color: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -180,
            bottom: -260,
            width: 720,
            height: 720,
            borderRadius: 720,
            background: "#6331FB",
          }}
        />
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 12, textTransform: "uppercase" }}>
          Element Vertex
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ display: "flex", width: 80, height: 8, background: "#88F9C0", marginBottom: 36, borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.02, letterSpacing: -3 }}>
            One partner for every business function.
          </div>
          <div style={{ display: "flex", marginTop: 32, fontSize: 30, color: "#88F9C0" }}>
            Marketing · Accounting · CRM · Software · Operations
          </div>
        </div>
      </div>
    ),
    size,
  );
}
