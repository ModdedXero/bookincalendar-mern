import React, { useLayoutEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
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

import { GenerateLocalURL } from "../../../../Utility/RandomUtils";

export default function PostViewBody({ postData }) {
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
        <div className="inspire-post">
            <h1 className="inspire-post-title">{postData.title}</h1>
            <ReactQuill
                className="inspire-post-quill"
                readOnly
                theme="bubble"
                value={postData.body}
            />
            <div className="inspire-post-share">
                <FacebookShareButton 
                    url={GenerateLocalURL(`/inspire/post/?postid=${postData._id}`)}
                    quote={postData.title} 
                >
                    <FacebookIcon size={42} round />
                </FacebookShareButton>
                <TwitterShareButton
                    url={GenerateLocalURL(`/inspire/post/?postid=${postData._id}`)}
                    title={postData.title}
                >
                    <TwitterIcon size={42} round />
                </TwitterShareButton>
                <PinterestShareButton
                    url={GenerateLocalURL(`/inspire/post/?postid=${postData._id}`)}
                    media={postData.coverImage}
                    description={postData.title}
                >
                    <PinterestIcon size={42} round />
                </PinterestShareButton>
                <CopyToClipboard 
                    text={GenerateLocalURL(`/inspire/post/?postid=${postData._id}`)} 
                    onCopy={handleCopy}
                >
                    <button className="stripped-button">
                        <LivejournalIcon size={42} round />
                    </button>
                </CopyToClipboard>
            </div>
        </div>
    )
}
