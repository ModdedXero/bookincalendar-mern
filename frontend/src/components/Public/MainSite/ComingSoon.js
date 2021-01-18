import React from "react";

export default function ComingSoon() {
    return (
        <div className="coming-soon bg-img-paral home-bg-img-3">
            <div className="coming-soon-container center">
                <div className="coming-soon-backdrop" />
                <div className='loader'>
                    <div className='loader_cogs'>
                        <div className='COGfirst'>
                            <div className='firstPart'></div>
                            <div className='firstPart'></div>
                            <div className='firstPart'></div>
                            <div className='firstHole'></div>
                        </div>
                        <div className='COGsecond'>
                            <div className='secondPart'></div>
                            <div className='secondPart'></div>
                            <div className='secondPart'></div>
                            <div className='secondHole'></div>
                        </div>
                        <div className='COGthird'>
                            <div className='thirdPart'></div>
                            <div className='thirdPart'></div>
                            <div className='thirdPart'></div>
                            <div className='thirdHole'></div>
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
