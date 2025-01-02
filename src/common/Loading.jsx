import React from "react";
import { motion } from "framer-motion";

const Loading = ({ centered = false }) => {
  const spinnerContent = (
    <div className="flex items-center justify-center gap-1.5">
      {[
        "bg-primary",
        "bg-secondary",
        "bg-primary",
        "bg-secondary",
        "bg-primary",
      ].map((color, i) => (
        <motion.span
          key={i}
          className={`w-1 h-[50px] ${color}`}
          animate={{
            scaleY: [0.05, 1, 0.05],
          }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
            repeat: Infinity,
            delay: i * -0.1,
            times: [0, 0.2, 1],
          }}
        />
      ))}
    </div>
  );

  if (centered) {
    return (
      <div className="loading-spinner">
        <div className="loading-spinner-content">{spinnerContent}</div>
      </div>
    );
  }

  return spinnerContent;
};

export default Loading;
