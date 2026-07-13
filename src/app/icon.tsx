import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#4f46e5",
        color: "white",
        display: "flex",
        fontSize: 15,
        fontWeight: 700,
        height: "100%",
        justifyContent: "center",
        letterSpacing: "-1px",
        width: "100%",
      }}
    >
      CL
    </div>,
    size,
  );
}
