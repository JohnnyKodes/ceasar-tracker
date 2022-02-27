import { motion } from "framer-motion";
import images from "../constants/images";

const Loader = () => {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1,
  };

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-70px)]">
      <div className="relative w-32 h-32">
        <motion.img
          animate={{ rotate: 360 }}
          transition={spinTransition}
          src={images.CeasarTrackerLogo}
        />
      </div>
    </div>
  );
};

export default Loader;
