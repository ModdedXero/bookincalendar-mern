import React from "react";

export default function SubmitForm() {
    return (
        <div className="home-submit">
            <h1>SUBMIT.</h1>
            <p className="home-submit-line" />
            <p className="home-submit-text">
                We are looking for photographers to write helpful tutorials and articles that are photography related to feature on our blog. Include 5-10 photographs that pertain to your article. Do you love to write? Submit your ideas below. 
            </p>
            <form>
                <div className="home-submit-input">
                    <label>Name *</label>
                    <input type="text" required></input>
                </div>
                <div className="home-submit-input">
                    <label>Email *</label>
                    <input type="text" required></input>
                </div>
                <div className="home-submit-input">
                    <label>Busines</label>
                    <input type="text"></input>
                </div>
                <div className="home-submit-input">
                    <label>Website</label>
                    <input type="url"></input>
                </div>
                <div className="home-submit-input">
                    <label>Link to Gallery</label>
                    <input type="url"></input>
                </div>
                <div className="home-submit-input">
                    <label>Link to Tutorial/Article</label>
                    <input type="url"></input>
                </div>
                <div className="home-submit-input">
                    <label>Tell Us About the Session or Article</label>
                    <textarea ></textarea>
                </div>
                <button type="submit" className="home-submit-btn">Send</button>
            </form>
        </div>
    )
}
