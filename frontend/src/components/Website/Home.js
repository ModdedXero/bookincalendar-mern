import { sub } from "date-fns";
import React, { useState, useRef, useEffect } from "react";

const getDimensions = ele => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;

    return {
        height,
        offsetTop,
        offsetBottom
    }
}

const scrollTo = (ele) => {
    const yOffset = -67;
    const y = ele.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
}

export default function Home() {
    const [visibleSection, setVisibleSection] = useState();

    const navRef = useRef(null);
    const homeRef = useRef(null);
    const thWeDoRef = useRef(null);
    const communityRef = useRef(null);
    const submitRef = useRef(null);
    const followUsRef = useRef(null);

    const sectionRefs = [
        { section: "Home", ref: homeRef },
        { section: "ThWeDo", ref: thWeDoRef },
        { section: "Community", ref: communityRef },
        { section: "Submit", ref: submitRef },
        { section: "FollowUs", ref: followUsRef }
    ]

    useEffect(() => {
        const handleScroll = () => {
            const { height: navHeight } = getDimensions(navRef.current);
            const scrollPosition = window.scrollY + navHeight;

            const selected = sectionRefs.find(({ section, ref }) => {
                const ele = ref.current;
                if (ele) {
                    const { offsetBottom, offsetTop } = getDimensions(ele);
                    return scrollPosition >= offsetTop && scrollPosition < offsetBottom;
                }
            });

            if (selected && selected.section !== visibleSection) {
                setVisibleSection(selected.section);
            }
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [visibleSection])

    return (
        <div className="site-content">
            <div className="sticky">
                <nav className="navbar" ref={navRef}>
                    <button 
                        type="button" 
                        className={`navbar-link ${visibleSection === "Home" ? "active" : ""}`} 
                        onClick={() => {scrollTo(homeRef.current)}}
                    >
                        Home
                    </button>
                    <button 
                        type="button" 
                        className={`navbar-link ${visibleSection === "ThWeDo" ? "active" : ""}`}
                        onClick={() => {scrollTo(thWeDoRef.current)}}
                    >
                        Things We Do
                    </button>
                    <button 
                        type="button" 
                        className={`navbar-link ${visibleSection === "Community" ? "active" : ""}`}
                        onClick={() => {scrollTo(communityRef.current)}}
                    >
                        Community
                    </button>
                    <button 
                        type="button" 
                        className={`navbar-link ${visibleSection === "Submit" ? "active" : ""}`}
                        onClick={() => {scrollTo(submitRef.current)}}
                    >
                        Submit
                    </button>
                    <button 
                        type="button" 
                        className={`navbar-link ${visibleSection === "FollowUs" ? "active" : ""}`}
                        onClick={() => {scrollTo(followUsRef.current)}}
                    >
                        Follow Us
                    </button>
                </nav>
            </div>
            <div className="bg-img-paral home-bg-img-1" id="Home" ref={homeRef} />
            <div className="bg-img-paral home-bg-img-2" />
            <div className="home-twedo" id="ThWeDo" ref={thWeDoRef}>
                <h1>
                    THINGS WE DO.
                </h1>
                <div className="home-twedo-body">
                    <section>
                        <h2>FEATURE</h2>
                        <p className="home-twedo-line" />
                        <p>
                            We feature bold, emotional, colorful artists on our blog and social media.
                        </p>
                    </section>
                    <section>
                        <h2>COMMUNITY</h2>
                        <p className="home-twedo-line" />
                        <p>
                            We offer a community Facebook Group for lifestyle photographers to support each other.
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
                    src="https://firebasestorage.googleapis.com/v0/b/react-auth-dev-57b4d.appspot.com/o/SiteImages%2FHome%2FLOGO%20MINI.png?alt=media&token=b37f7015-8235-4485-b213-d7fac11f2d7a" 
                />
            </div>
            <div className="bg-img-paral home-bg-img-3" id="Community" ref={communityRef} />
            <div className="bg-img-paral home-bg-img-2" id="Submit" ref={submitRef} />
            <div className="bg-img-paral home-bg-img-4" id="FollowUs" ref={followUsRef} />
        </div>
    )
}
