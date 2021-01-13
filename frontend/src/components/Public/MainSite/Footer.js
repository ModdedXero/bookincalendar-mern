import React from "react";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="site-footer">
            <button type="button" onClick={scrollToTop}>Scroll To Top</button>
            <br />
            <span>© 2021 Bold Emotional Colorful Lifestyle Photography Blog</span>
        </div>
    )
}
