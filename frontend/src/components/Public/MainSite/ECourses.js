import React, { useEffect } from "react";
import { motion } from "framer-motion";

const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    }
};

const pageTransition = {
    ease: "easeOut",
    duration: .7
};

const pageStyle = {
    position: "relative"
};

export default function ECourses({ setPage }) {
    useEffect(() => {
        setPage("ECourses");
    })

    return (
        <motion.div
            style={pageStyle}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            ECourses
        </motion.div>
    )
}