import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaArrowUp } from "react-icons/fa";

const FloatingButtons: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  // WhatsApp click handler
  const handleWhatsApp = () => {
    const phoneNumber = "918499919197";
    const message = "Hello! I would like to know more about your services.";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show scroll button on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* WhatsApp Button - LEFT */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-8 left-6 cursor-pointer bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 hover:scale-110 transition-all duration-300 z-40"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </button>

      {/* Scroll to Top Button - RIGHT */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 bg-gray-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:bg-gray-600 hover:scale-110 transition-all duration-300 z-40"
          aria-label="Scroll to Top"
        >
          <FaArrowUp className="w-5 h-5 text-white" />
        </button>
      )}
    </>
  );
};

export default FloatingButtons;
