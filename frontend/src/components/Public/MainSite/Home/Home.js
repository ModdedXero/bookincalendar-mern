import React, { useEffect } from "react";
import { motion } from "framer-motion";

import SubmitForm from "./SubmitForm";

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

export default function Home({ setPage }) {
    useEffect(() => {
        setPage("Home");
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
            <div className="bg-img-paral home-bg-img-1" id="Home" />
            <div className="bg-img-paral home-bg-img-2" />
            <div className="home-twedo" id="ThWeDo">
                <h1>INSPIRE. CREATE. EDUCATE.</h1>
                <div className="home-twedo-body">
                    <section>
                        <h2>COMMUNITY</h2>
                        <p className="home-twedo-line" />
                        <p>
                            We offer a community Facebook Group for lifestyle photographers to support each other.
                        </p>
                    </section>
                    <section>
                        <h2>FEATURE</h2>
                        <p className="home-twedo-line" />
                        <p>
                            We feature bold, emotional, colorful artists on our blog and social media.
                        </p>
                    </section>
                    <section>
                        <h2>BLOG</h2>
                        <p className="home-twedo-line" />
                        <p>
                            We feature sessions & artists on our blog. Plus offer tips on shooting and business.
                        </p>
                    </section>
                </div>
                <img 
                    className="home-minilogo"
                    alt=""
                    src="https://firebasestorage.googleapis.com/v0/b/bec-livesite.appspot.com/o/SiteImages%2FHome%2FLOGO%20MINI.png?alt=media&token=1e555dc3-23ab-4705-86c9-cfbe070890de" 
                />
            </div>
            <div className="bg-img-paral home-bg-img-3 home-community" id="Community">
                <h1>THINGS WE DO.</h1>
                <div className="home-community-body">
                    <section className="home-community-body-img">
                        <img alt="" src="https://firebasestorage.googleapis.com/v0/b/bec-livesite.appspot.com/o/SiteImages%2FHome%2FManWithBaby.jpg?alt=media&token=07362e9e-0c21-445e-89db-0d9b658b3e09" />
                    </section>
                    <section className="home-community-body-text">
                        <p>Welcome!!!</p>
                        <br />
                        <p>Here is some of the things we offer...</p>
                        <br />
                        <ul>
                            <li>E-Courses</li>
                            <li>Organization (Booking System)</li>
                            <li>Featuring Photographers</li>
                            <li>Community</li>
                            <li>Inspiration</li>
                        </ul>
                    </section>
                </div>
            </div>
            <SubmitForm />
            <div className="home-follow" id="FollowUs">
                <h1>Let's get Social</h1>
                <p className="home-follow-line" />
                <div className="home-follow-body">
                    <button>FB PAGE</button>
                    <button>FB GROUP</button>
                    <button>INSTAGRAM</button>
                </div>
            </div>
            <div className="bg-img-paral home-bg-img-3 home-last" />
        </motion.div>
    )
}
