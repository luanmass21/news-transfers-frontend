

import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";

const MessageAlert = ({ message, type }) => {
  let bg = "transparent";
  let shadow = "rgba(34, 197, 94, 0.4)";

  if (type === "error") {
    bg = "#dc2626";
    shadow = "rgba(220, 38, 38, 0.4)";
  }

  if (type === "warning") {
    bg = "#eab308";
    shadow = "rgba(234, 179, 8, 0.4)";
  }

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
  style={{
    position: "fixed", // ⭐ ESSA LINHA RESOLVE
    top: "90px",
    left: "50%",
    transform: "translateX(-50%)",
    background: bg,
    padding: "12px 20px",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    boxShadow: `0 6px 18px ${shadow}`,
    zIndex: 9999
  }}
>
  {message}
</motion.div>
      )}
    </AnimatePresence>
  );
};

MessageAlert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
};

export default MessageAlert;