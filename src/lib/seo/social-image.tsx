import { ImageResponse } from "next/og";

export const socialImageAlt =
  "CalcLab - 더 나은 판단을 위한 현대적인 계산 플랫폼";
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

export function createSocialImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#f8fafc",
        color: "#172033",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 80px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          background: "#4f46e5",
          borderRadius: 999,
          height: 360,
          opacity: 0.1,
          position: "absolute",
          right: -80,
          top: 100,
          width: 360,
        }}
      />
      <div
        style={{
          color: "#4f46e5",
          display: "flex",
          fontSize: 36,
          fontWeight: 700,
        }}
      >
        CalcLab
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.2,
          }}
        >
          Modern calculators
          <br />
          for better decisions
        </div>
        <div style={{ color: "#5c667a", display: "flex", fontSize: 28 }}>
          Clear. Fast. Accessible.
        </div>
      </div>
      <div
        style={{
          alignItems: "flex-end",
          display: "flex",
          gap: 18,
          height: 110,
          justifyContent: "flex-end",
        }}
      >
        {[38, 58, 82, 110].map((height, index) => (
          <div
            key={height}
            style={{
              background: index === 3 ? "#4f46e5" : "#99a5ec",
              borderRadius: 10,
              display: "flex",
              height,
              width: 34,
            }}
          />
        ))}
      </div>
    </div>,
    socialImageSize,
  );
}
