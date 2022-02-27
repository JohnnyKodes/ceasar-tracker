import { useState } from "react";
import images from "../constants/images";
import { HiMenu } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navLinks = ["Home", "Cryptocurrencies", "News"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 w-full z-10">
      <AnimatePresence>
        {isOpen && (
          <div className="h-screen z-50 absolute w-fit right-0 flex ">
            <motion.aside
              initial={{ x: 500 }}
              animate={{ x: 0, transition: { type: "tween" } }}
              exit={{
                x: 500,
                transition: { type: "tween", delay: 0.2, duration: 0.3 },
              }}
              className="h-full w-full bg-zinc-900 flex flex-col p-5 right-0"
            >
              <div className="w-full h-auto flex items-center justify-end">
                <div className="icon" onClick={() => setIsOpen(!isOpen)}>
                  <AiOutlineClose className="text-4xl" />
                </div>
              </div>
              <motion.div className="w-full h-full flex flex-col items-center justify-evenly px-20">
                {navLinks.map((link) => (
                  <Link
                    to={`/${link === "Home" ? "" : link.toLowerCase()}`}
                    onClick={() => setIsOpen(!isOpen)}
                    key={link}
                    className="text-2xl font-bold cursor-pointer linkHover"
                  >
                    {link}
                  </Link>
                ))}
              </motion.div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="w-full h-[70px] bg-neutral-900 flex items-center sm:px-10 px-4 backdrop-blur bg-opacity-40 shadow-lg shadow-zinc-700/20">
        <Link to="/" className="h-full py-1 flex items-center cursor-pointer">
          <img
            src={images.CeasarTrackerLogo}
            alt=""
            className="h-full w-auto"
          />
          <p className="sm:text-4xl text-3xl ml-4 font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-yellow-500">
            Ceasar Tracker
          </p>
        </Link>
        <div className="w-full h-full flex-1 lg:flex hidden justify-center">
          <div className="flex items-center h-full w-7/12 justify-between">
            {navLinks.map((link) => (
              <Link
                to={`/${link === "Home" ? "" : link.toLowerCase()}`}
                key={`${link}-link`}
                className="text-lg font-bold cursor-pointer linkHover"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full h-full flex lg:hidden flex-1 items-center justify-end">
          <div className="icon" onClick={() => setIsOpen(!isOpen)}>
            <HiMenu className="text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
