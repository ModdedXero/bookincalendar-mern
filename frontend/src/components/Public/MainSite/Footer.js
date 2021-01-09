import React from "react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="home-footer">
            <button type="button" onClick={scrollToTop}>Scroll To Top</button>
            <br />
            <span>© 2018 Bold Emotional Colorful Lifestyle Photography Blog</span>
        </div>
    )
}
