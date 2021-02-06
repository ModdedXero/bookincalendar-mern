import React from "react";
import { Link } from "react-router-dom";

import SubmitForm from "./SubmitForm";
import SiteFooter from "../SiteFooter";
import NewsletterPop from "../../NewsletterPop";

export default function Home() {
    return (
        <>
            <NewsletterPop />
            <div className="bg-img-paral home-bg-img-1" id="Home">
                <Link className="blog-atag center stripped-button" to="/inspire">
                    {"The Blog >"}
                </Link>
            </div>
            <div className="bg-img-paral home-bg-img-2" />
            <div className="home-twedo" id="ThWeDo">
                <h1>INSPIRE. CREATE. EDUCATE.</h1>
                <div className="home-twedo-body">
                    <section>
                        <h2>INSPIRE</h2>
                        <p className="home-twedo-line" />
                        <p>
                            Featuring sessions & BEC artists on our blog. Let's Inspire each other.
                        </p>
                    </section>
                    <section>
                        <h2>CREATE</h2>
                        <p className="home-twedo-line" />
                        <p>
                            Get all the tools you need to stay inspired, create beautiful portraits and run a successful business.
                        </p>
                    </section>
                    <section>
                        <h2>EDUCATE</h2>
                        <p className="home-twedo-line" />
                        <p>
                            Offering mini & full online e-courses for lifestyle photographers.
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
                <h1>OUR COMMUNITY</h1>
                <div className="home-community-body">
                    <section className="home-community-body-img">
                        <img alt="" src="https://firebasestorage.googleapis.com/v0/b/bec-livesite.appspot.com/o/SiteImages%2FHome%2FManWithBaby.jpg?alt=media&token=07362e9e-0c21-445e-89db-0d9b658b3e09" />
                    </section>
                    <section className="home-community-body-text">
                        <p>Bold, Emotional, Colorful is a photography community for lifestyle photographers.</p>
                        <p>Want to learn from BEC Artists? </p>
                        <p>We provide the tools you need to find your style and run a business. </p>
                    </section>
                </div>
            </div>
            <SubmitForm />
            <div className="home-follow" id="FollowUs">
                <h1>Let's get Social</h1>
                <p className="home-follow-line" />
                <div className="home-follow-body">
                    <a href="https://www.facebook.com/boldemotionalcolorful">FB PAGE</a>
                    <a href="https://www.facebook.com/groups/1765869786763760">FB GROUP</a>
                    <a href="https://www.instagram.com/boldemotionalcolorful/">INSTAGRAM</a>
                </div>
            </div>
            <div className="bg-img-paral home-bg-img-3 home-last" />
            <SiteFooter />
        </>
    )
}
