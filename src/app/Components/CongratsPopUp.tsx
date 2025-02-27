import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { IoCloseCircle } from "react-icons/io5";

interface CongratsPopUpProps {
  onClose: () => void;
}

const CongratsPopUp: React.FC<CongratsPopUpProps> = ({ onClose }) => {
  const [showConfetti, setShowConfetti] = useState<boolean>(true);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} />}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          🎉 Happy News Day! 🎉
        </h2>
        <p className="text-gray-600">
          Thanks for Subscribing! Stay tuned for the latest updates.
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CongratsPopUp;
