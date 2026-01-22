import React, { useRef, useEffect } from 'react'
import Lottie from 'lottie-react'
import robotIdle from '../assets/animations/robot-idle.json'
import robotSuccess from '../assets/animations/robot-success.json'
import robotCelebrate from '../assets/animations/robot-celebrate.json'
import robotDelete from '../assets/animations/robot-delete.json'

const DigitalHelper = ({ mood }) => {
    const lottieRef = useRef(null)

    const getAnimation = () => {
        switch (mood) {
            case 'success': return robotSuccess
            case 'celebrate': return robotCelebrate
            case 'delete': return robotDelete
            default: return robotIdle
        }
    }

    const animationData = getAnimation()
    // Loop only when idle
    const isLooping = mood === 'idle'

    return (
        <div className="fixed bottom-4 right-4 hidden md:block z-50 pointer-events-none select-none">
            {/* Holographic Container */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center transition-transform duration-700 ease-in-out hover:scale-105">

                {/* Glassmorphism/Holographic Background */}
                <div className="absolute inset-0 rounded-full bg-blue-500/10 dark:bg-blue-400/20 backdrop-blur-md border border-blue-400/30 dark:border-blue-300/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] dark:shadow-[0_0_20px_rgba(96,165,250,0.6)] animate-pulse"></div>

                {/* Inner Ring */}
                <div className="absolute inset-2 rounded-full border border-blue-300/20 dark:border-blue-300/40"></div>

                {/* Character Container with Holographic Filters */}
                <div className="relative w-full h-full p-4 drop-shadow-[0_0_8px_rgba(100,200,255,0.8)] filter contrast-125 brightness-110 opacity-90">
                    <Lottie
                        key={mood}
                        lottieRef={lottieRef}
                        animationData={animationData}
                        loop={isLooping}
                        autoplay={true}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </div>
    )
}

export default DigitalHelper
