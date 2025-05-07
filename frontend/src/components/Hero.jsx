import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import useTypewriter from "../hooks/useTypewriter";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Hero = ({ title }) => {
  const { text, isTyping } = useTypewriter(title, 100);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [-5, 5]); // Tilt up/down
  const rotateY = useTransform(x, [-0.5, 0.5], [5, -5]); // Tilt left/right
  const scale = useTransform(y, [-0.5, 0.5], [1, 1.03]); // Subtle zoom

  // Floating bubbles
  const bubbles = [...Array(5)].map(() => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 100 + 50,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <motion.div
      className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
      }}
      transition={{
        opacity: { duration: 0.5 },
        backgroundPosition: { duration: 12, repeat: Infinity, ease: "linear" }
      }}
      style={{
        background: "linear-gradient(-45deg, #3b82f6, #2563eb, #1d4ed8, #3b82f6)",
        backgroundSize: "400% 400%",
        rotateX,
        rotateY,
        scale,
      }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {/* Animated bubbles */}
      <div className="absolute inset-0 opacity-30">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            initial={{
              x: `${bubble.x}%`,
              y: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              transition: {
                duration: bubble.duration,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      {/* Glass card with 3D shadow (matches tilt) */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-xl border border-white/20 shadow-2xl"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        style={{
          rotateX: useTransform(y, [-0.5, 0.5], [-2, 2]), // Less tilt than container
          rotateY: useTransform(x, [-0.5, 0.5], [2, -2]),
        }}
      >
        <motion.h1
          className="text-3xl md:text-5xl font-bold text-white text-center"
          animate={{
            textShadow: "0 0 15px rgba(255, 255, 255, 0.7)",
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2
          }}
        >
          {text}
          {isTyping && (
            <span className="ml-1 inline-block w-1 h-10 bg-white animate-pulse" />
          )}
        </motion.h1>
      </motion.div>

      {/* Scroll hint (only shows if content is below) */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDownIcon className="h-6 w-6 text-white/80" />
      </motion.div>
    </motion.div>
  );
};

export default Hero;