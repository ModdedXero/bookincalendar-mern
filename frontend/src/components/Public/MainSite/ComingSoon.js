import React from "react";

export default function ComingSoon() {
    return (
        <div className="coming-soon bg-img-paral home-bg-img-3">
            <div className="coming-soon-container center">
                <div className="coming-soon-backdrop" />
                <div class='loader'>
                    <div class='loader_cogs'>
                        <div class='COGfirst'>
                            <div class='firstPart'></div>
                            <div class='firstPart'></div>
                            <div class='firstPart'></div>
                            <div class='firstHole'></div>
                        </div>
                        <div class='COGsecond'>
                            <div class='secondPart'></div>
                            <div class='secondPart'></div>
                            <div class='secondPart'></div>
                            <div class='secondHole'></div>
                        </div>
                        <div class='COGthird'>
                            <div class='thirdPart'></div>
                            <div class='thirdPart'></div>
                            <div class='thirdPart'></div>
                            <div class='thirdHole'></div>
                        </div>
                    </div>
                </div>
                <h1>
                    Coming Soon
                </h1>
            </div>
        </div>
    )
}
