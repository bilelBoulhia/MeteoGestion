import React from "react";

export function DotBackground() {
    return (
        <div className="absolute inset-0 h-full w-full bg-transparent   bg-dot-black/[0.2] bg-white   flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#FEFDFB]  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
    );
}
