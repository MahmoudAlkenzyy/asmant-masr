import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Top Progress Bar Simulation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "4px",
          background: "linear-gradient(90deg, #618FB5, #b0dff0, #618FB5)",
          backgroundSize: "200% 100%",
          width: "100%",
          animation: "progress-pulse 2s linear infinite",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "fade-in 0.6s ease-out",
        }}
      >
        {/* Real Logo Placeholder (using img since it's a server component loading state) */}
        <div
          style={{
            position: "relative",
            width: "220px",
            height: "90px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img 
            src="/images/Home/CementEgypt.png" 
            alt="أسمنت مصر" 
            style={{ width: "220px", height: "90px", objectFit: "contain" }} 
          />
          <div style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            background: "radial-gradient(circle, rgba(97,143,181,0.15) 0%, transparent 70%)",
            animation: "pulse-bg 2s ease-in-out infinite"
          }} />
        </div>

        {/* Spinner */}
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "3px solid rgba(97,143,181,0.1)",
            borderTop: "3px solid #618FB5",
            animation: "spin 1s linear infinite",
          }}
        />

        <p
          style={{
            marginTop: "20px",
            fontSize: "16px",
            color: "#1e3a5f",
            fontWeight: "600",
            fontFamily: "sans-serif",
          }}
        >
          جاري التحميل...
        </p>
      </div>

      <style>{`
        @keyframes progress-pulse {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-bg {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}


