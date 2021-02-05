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

import { useStickyWindow } from "../../../Utility/Hooks";

export default function SocialMedia({ post }) {
    const [isCopied, setIsCopied] = useState(false);

    useStickyWindow();

    const handleCopy = () => {
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
