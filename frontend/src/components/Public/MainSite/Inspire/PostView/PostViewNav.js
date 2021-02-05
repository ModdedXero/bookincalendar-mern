import React, { useState } from "react";
import { Link } from "react-router-dom";
import DynamicLink from "../../../../Utility/DynamicLink";

export default function PostViewNav() {
    return (
        <div className="inspire-post-navbar">
            <DynamicLink className="stripped-button" to="/inspire">All Posts</DynamicLink>
            <DynamicLink className="stripped-button" to="/inspire/featured">Featured</DynamicLink>
            <DynamicLink className="stripped-button" to="/inspire/artists">Featured Artists</DynamicLink>
            <DynamicLink className="stripped-button" to="/inspire/business">Business</DynamicLink>
            <DynamicLink className="stripped-button" to="/inspire/tutorials">Tutorials</DynamicLink>
            <div className="float-right">
            </div>
        </div>
    )
}
