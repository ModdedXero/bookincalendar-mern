import React, { useLayoutEffect, useRef, useState } from "react";
import { 
    FacebookShareButton, 
    TwitterShareButton, 
    FacebookIcon, 
    TwitterIcon, 
    LivejournalIcon, 
    PinterestShareButton,
    PinterestIcon
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { GenerateLocalURL } from "../../../Utility/RandomUtils";

export default function SocialMedia({ post }) {
    const windowPosition = useRef({});
    const [isCopied, setIsCopied] = useState(false);

    useLayoutEffect(() => {
        if (windowPosition !== null) {
            window.scrollTo(windowPosition.current.x, windowPosition.current.y);
        }
    })

    const handleCopy = () => {
        windowPosition.current = { x: window.scrollX, y: window.scrollY };
        setIsCopied(true);
    }

    return (
        <div className="inspire-post-share">
            <FacebookShareButton 
                url={`www.boldemotionalcolorful.com/inspire/post/${post.slug}`}
                quote={post.title} 
            >
                <FacebookIcon size={42} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={`www.boldemotionalcolorful.com/inspire/post/${post.slug}`}
                title={post.title}
            >
                <TwitterIcon size={42} round />
            </TwitterShareButton>
            <PinterestShareButton
                url={`www.boldemotionalcolorful.com/inspire/post/${post.slug}`}
                media={post.coverImage}
                description={post.title}
            >
                <PinterestIcon size={42} round />
            </PinterestShareButton>
            <CopyToClipboard 
                text={`www.boldemotionalcolorful.com/inspire/post/${post.slug}`} 
                onCopy={handleCopy}
            >
                <button className="stripped-button">
                    <LivejournalIcon size={42} round />
                </button>
            </CopyToClipboard>
            <p style={{ color: "green", marginLeft: "182px" }}>{isCopied && "Copied!"}</p>
        </div>
    )
}
