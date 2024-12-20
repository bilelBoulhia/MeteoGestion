import React from 'react';

const SimpleBackgroundWithSun: React.FC = () => {
    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden ">
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* More visible sun */}
                <circle cx="0" cy="0" r="100" fill="url(#sunGradient)" opacity="0.8">
                    <animate attributeName="opacity" values="0.8;0.6;0.8" dur="10s" repeatCount="indefinite"/>
                </circle>

                {/* More visible rays */}
                {[30, 60, 90, 120, 150].map((angle, index) => (
                    <line
                        key={index}
                        x1="0"
                        y1="0"
                        x2={`${20 * Math.cos(angle * Math.PI / 180)}%`}
                        y2={`${20 * Math.sin(angle * Math.PI / 180)}%`}
                        stroke="rgba(255,204,0,0.4)"
                        strokeWidth="2"
                    >
                        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="8s" repeatCount="indefinite"/>
                    </line>
                ))}

                {/* More visible cloud-like polygons */}
                <polygon points="70,20 85,10 100,20 95,30 75,30" fill="rgba(255,255,255,0.5)"
                         className="animate-float-slow">
                    <animate attributeName="points"
                             values="70,20 85,10 100,20 95,30 75,30; 72,22 87,12 102,22 97,32 77,32; 70,20 85,10 100,20 95,30 75,30"
                             dur="30s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="20,50 35,40 50,50 45,60 25,60" fill="rgba(255,255,255,0.4)"
                         className="animate-float-slower">
                    <animate attributeName="points"
                             values="20,50 35,40 50,50 45,60 25,60; 22,52 37,42 52,52 47,62 27,62; 20,50 35,40 50,50 45,60 25,60"
                             dur="40s" repeatCount="indefinite"/>
                </polygon>
                <polygon points="80,70 95,60 110,70 105,80 85,80" fill="rgba(255,255,255,0.45)"
                         className="animate-float-slowest">
                    <animate attributeName="points"
                             values="80,70 95,60 110,70 105,80 85,80; 82,72 97,62 112,72 107,82 87,82; 80,70 95,60 110,70 105,80 85,80"
                             dur="35s" repeatCount="indefinite"/>
                </polygon>

                {/* Gradient definitions */}
                <defs>
                    <radialGradient id="sunGradient">
                        <stop offset="0%" stopColor="rgba(255,215,0,0.8)"/>
                        <stop offset="100%" stopColor="rgba(255,165,0,0.5)"/>
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
};

export default SimpleBackgroundWithSun;

/*
*
*
* */