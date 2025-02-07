// src/components/layout/TransitionsWrapper.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Define the animation variants.
const variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const transition = { duration: 0.5, ease: "easeInOut" };

// Module-level flag to know if we already loaded once.
let hasLoaded = false;

interface TransitionsWrapperProps {
  children: React.ReactNode;
}

const TransitionsWrapper = ({ children }: TransitionsWrapperProps) => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  // initialVariant will be "hidden" only on the very first load.
  const [initialVariant, setInitialVariant] = useState<"hidden" | false>("hidden");

  useEffect(() => {
    // Once mounted, update our state.
    setIsMounted(true);
    if (hasLoaded) {
      // On subsequent navigations, disable the entry animation.
      setInitialVariant(false);
    } else {
      hasLoaded = true;
      setInitialVariant("hidden");
    }
    // Note: adding pathname to dependencies so that the effect runs on every navigation.
  }, [pathname]);

  // Before hydration, render a static container.
  if (!isMounted) {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          opacity: 1,
          transform: "none",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={initialVariant}
        animate="visible"
        exit="exit"
        variants={variants}
        transition={transition}
        style={{ position: "absolute", width: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransitionsWrapper;
