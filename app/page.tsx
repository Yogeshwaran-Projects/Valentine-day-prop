
 "use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { SparklesIcon } from "@heroicons/react/24/solid";

const Confetti = dynamic(
  () => import("react-confetti").then((mod) => mod.default as React.FC<Record<string, unknown>>),
  { ssr: false }
);

export default function ValentinePage() {
  const [accepted, setAccepted] = useState(false);
  const [noClicks, setNoClicks] = useState(0);
  const [hoveringNo, setHoveringNo] = useState(false);
  const [showMagic, setShowMagic] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleYesClick = useCallback(() => {
    setAccepted(true);
    setShowMagic(true);
    setTimeout(() => setShowContract(true), 2000);
  }, []);

  const handleNoClick = useCallback(() => {
    setNoClicks((prev) => prev + 1);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-all duration-500 text-center ${
        noClicks > 5 ? "animate-shake" : ""
      }`}
      style={{
        transform: `rotate(${noClicks * 2}deg) scale(${1 - noClicks * 0.05})`,
        backgroundColor: noClicks > 5 ? "#ff4d4d" : "#ffcccb",
        filter: noClicks > 8 ? "blur(5px) invert(1)" : "none",
      }}
    >
      {accepted && <Confetti width={dimensions.width} height={dimensions.height} />}

      <h1 className="text-4xl sm:text-5xl font-bold text-red-600 mb-8 animate-pulse flex items-center justify-center gap-2">
        Will you be my Valentine? ❤️ <SparklesIcon className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-300 animate-spin" />
      </h1>

      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <motion.button
          onClick={handleYesClick}
          whileHover={{ scale: 1.2 }}
          className="px-6 py-3 bg-green-500 text-white font-bold rounded-xl shadow-md hover:bg-green-600 transition text-lg sm:text-xl"
        >
          Yes 💖
        </motion.button>

        <motion.button
          onClick={handleNoClick}
          onMouseEnter={() => setHoveringNo(true)}
          onMouseLeave={() => setHoveringNo(false)}
          animate={{
            x: hoveringNo ? Math.random() * 300 - 150 : 0,
            y: hoveringNo ? Math.random() * 300 - 150 : 0,
            scale: 1 - noClicks * 0.1,
            rotate: hoveringNo ? Math.random() * 360 : 0,
          }}
          transition={{ type: "spring", stiffness: 100 }}
          className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow-md text-lg sm:text-xl"
        >
          No 😢
        </motion.button>
      </div>

      {showContract && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-90 z-50 p-4 sm:p-6"
        >
          <div className="text-center text-black max-w-md">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Official Valentine’s Contract 💍</h2>
            <p className="text-lg">I, the undersigned, hereby accept the most amazing Valentine proposal ever!</p>
            <p className="mt-4 italic">&quot;
              "யாரும் கேட்கா எதுவொன்றை எது ஒன்றை
நான் கேட்டேன் உன்னை
அதைத் தந்தால் நன்றி
பிடிவாதம் இன்றி
நீ தந்தால் நன்றி
துளி துளிரே
துளி காலம் கேட்டேன்
துளி காதல் கேட்டேன்
துளி காமம் கேட்டேன்
மறு உயிரே"&quot;</p>
            <motion.button
              onClick={() => setShowFinalMessage(true)}
              whileHover={{ scale: 1.1 }}
              className="mt-6 px-6 py-3 bg-blue-500 text-white font-bold rounded-xl shadow-md hover:bg-blue-600 transition text-lg"
            >
              Sign with ❤️
            </motion.button>
          </div>
        </motion.div>
      )}

      {showFinalMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50 p-4 sm:p-6 text-white text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 animate-bounce">
            Oommala Neethan Di En Wife uh Neethan Di Life Uh! 💍💖
          </h2>
        </motion.div>
      )}
    </div>
  );
}
