import { ImageResponse } from "next/og";

export const alt = "VERCUNO — Digital, Built Better.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          position: "relative",
          overflow: "hidden",
          padding: "64px 72px",
          backgroundColor: "#02070A",
          color: "#F5F8FF",
          fontFamily: "sans-serif",
        }}
      >
        {/* Signature blue arc */}
        <div
          style={{
            position: "absolute",
            right: -270,
            top: 100,
            width: 750,
            height: 750,
            display: "flex",
            border: "3px solid #0297DE",
            borderRadius: "50%",
            opacity: 0.65,
          }}
        />

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 38,
              height: 5,
              backgroundColor: "#FC734D",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: "#B9CAD4",
            }}
          >
            INDEPENDENT SOFTWARE & AI STUDIO
          </span>
        </div>

        {/* Main brand */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 116,
              fontWeight: 900,
              letterSpacing: -7,
            }}
          >
            <span>VERCUNO</span>
            <span style={{ color: "#0297DE" }}>.</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 53,
              fontWeight: 600,
              letterSpacing: -2,
            }}
          >
            <span>Digital, </span>
            <span
              style={{
                color: "#0297DE",
                fontStyle: "italic",
                marginLeft: 12,
              }}
            >
              Built Better.
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            fontSize: 22,
            color: "#ABB9C5",
          }}
        >
          <span>WEB DEVELOPMENT / SOFTWARE / AI</span>
          <span>VERCUNO STUDIO</span>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    },
  );
}
