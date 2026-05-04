"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLoading } from "@/contexts/LoadingContext";

export function PageLoader() {
  const { isLoading } = useLoading();

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(15px)",
          }}
        >
          {/* Top Progress Bar */}
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "linear" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "4px",
              background: "linear-gradient(90deg, #618FB5, #b0dff0, #618FB5)",
              backgroundSize: "200% 100%",
              zIndex: 10001,
            }}
          />

          {/* Center Content Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Real Logo Container */}
            <div
              style={{
                position: "relative",
                width: "220px",
                height: "90px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              {/* Outer Glow / Pulse */}
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3] 
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  width: "120%",
                  height: "120%",
                  borderRadius: "20px",
                  background: "radial-gradient(circle, rgba(97,143,181,0.2) 0%, transparent 70%)",
                }}
              />
              
              <Image 
                src="/images/Home/CementEgypt.png" 
                alt="أسمنت مصر" 
                width={220} 
                height={90}
                style={{ objectFit: "contain", zIndex: 1 }}
              />
            </div>

            {/* Spinner ring around logo area or below */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "3px solid rgba(97,143,181,0.1)",
                borderTop: "3px solid #618FB5",
              }}
            />

            {/* Loading Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.2 }}
              style={{
                marginTop: "20px",
                fontSize: "16px",
                color: "#1e3a5f",
                fontWeight: "600",
                fontFamily: "var(--font-alexandria), sans-serif",
              }}
            >
              جاري التحميل...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

