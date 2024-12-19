"use client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({

                                                 className,
                                             }: {

    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const beams = [
        {
            initialX: 10,
            translateX: 10,
            duration: 7,
            repeatDelay: 3,
            delay: 2,
        },
        {
            initialX: 600,
            translateX: 600,
            duration: 3,
            repeatDelay: 3,
            delay: 4,
        },
        {
            initialX: 100,
            translateX: 100,
            duration: 7,
            repeatDelay: 7,

        },
        {
            initialX: 400,
            translateX: 400,
            duration: 5,
            repeatDelay: 14,
            delay: 4,
        },
        {
            initialX: 800,
            translateX: 800,
            duration: 11,
            repeatDelay: 2,

        },
        {
            initialX: 1000,
            translateX: 1000,
            duration: 4,
            repeatDelay: 2,

        },
        {
            initialX: 1200,
            translateX: 1200,
            duration: 6,
            repeatDelay: 4,
            delay: 2,

        },
        {
            initialX: 1400,
            translateX: 1300,
            duration: 6,
            repeatDelay: 4,
            delay: 2,

        },
        {
            initialX: 1500,
            translateX: 1500,
            duration: 6,
            repeatDelay: 4,
            delay: 2,

        },
        {
            initialX: 1600,
            translateX: 1800,
            duration: 6,
            repeatDelay: 4,
            delay: 2,

        },
    ];

    return (
        <div
            ref={parentRef}
            className={cn(
                "h-screen absolute top-0 bg-transparent inset-0  flex items-center w-full justify-center overflow-hidden",

                className
            )}
        >
            {beams.map((beam) => (
                <CollisionMechanism
                    key={beam.initialX + "beam-idx"}
                    beamOptions={beam}
                    containerRef={containerRef}
                    parentRef={parentRef}
                />
            ))}


            <div
                ref={containerRef}
                className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
                style={{
                    boxShadow:
                        "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
                }}
            ></div>
        </div>
    );
};

const CollisionMechanism = React.forwardRef<
    HTMLDivElement,
    {
        containerRef: React.RefObject<HTMLDivElement>;
        parentRef: React.RefObject<HTMLDivElement>;
        beamOptions?: {
            initialX?: number;
            translateX?: number;
            initialY?: number;
            translateY?: number;
            className?: string;
            duration?: number;
            delay?: number;
            repeatDelay?: number;
        };
    }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
    const beamRef = useRef<HTMLDivElement>(null);
    const [collision, setCollision] = useState<{
        detected: boolean;
        coordinates: { x: number; y: number } | null;
    }>({
        detected: false,
        coordinates: null,
    });
    const [beamKey, setBeamKey] = useState(0);
    const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

    useEffect(() => {
        const checkCollision = () => {
            if (
                beamRef.current &&
                containerRef.current &&
                parentRef.current &&
                !cycleCollisionDetected
            ) {
                const beamRect = beamRef.current.getBoundingClientRect();
                const containerRect = containerRef.current.getBoundingClientRect();
                const parentRect = parentRef.current.getBoundingClientRect();

                if (beamRect.bottom >= containerRect.top) {
                    const relativeX =
                        beamRect.left - parentRect.left + beamRect.width / 2;
                    const relativeY = beamRect.bottom - parentRect.top;

                    setCollision({
                        detected: true,
                        coordinates: {
                            x: relativeX,
                            y: relativeY,
                        },
                    });
                    setCycleCollisionDetected(true);
                }
            }
        };

        const animationInterval = setInterval(checkCollision, 50);

        return () => clearInterval(animationInterval);
    }, [cycleCollisionDetected, containerRef]);

    useEffect(() => {
        if (collision.detected && collision.coordinates) {
            setTimeout(() => {
                setCollision({ detected: false, coordinates: null });
                setCycleCollisionDetected(false);
            }, 2000);

            setTimeout(() => {
                setBeamKey((prevKey) => prevKey + 1);
            }, 2000);
        }
    }, [collision]);

    return (
        <>
            <motion.div
                key={beamKey}
                ref={beamRef}
                animate="animate"
                initial={{
                    translateY: beamOptions.initialY || "-200px",
                    translateX: beamOptions.initialX || "0px",
                    rotate:45

                }}
                variants={{
                    animate: {
                        translateY: beamOptions.translateY || "1800px",
                        translateX: beamOptions.translateX || "0px",
                        rotate:45

                    },
                }}
                transition={{
                    duration: beamOptions.duration || 8,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                    delay: beamOptions.delay || 0,
                    repeatDelay: beamOptions.repeatDelay || 0,
                }}
                className={cn(
                    "absolute left-0 top-20  m-auto mx-auto w-[2px] h-[2px] bg-blue-200 shadow-[0_12px_15px_0_rgba(0,0,0,0.44)] rounded-[0%_100%_100%_100%] ",
                    beamOptions.className
                )}
            />



            <AnimatePresence>
                {collision.detected && collision.coordinates && (
                    <Explosion
                        key={`${collision.coordinates.x}-${collision.coordinates.y}`}
                        className=""
                        style={{
                            left: `${collision.coordinates.x}px`,
                            top: `${collision.coordinates.y}px`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({...props}: React.HTMLProps<HTMLDivElement>) => {
    const spans = Array.from({length: 20}, (_, index) => ({
        id: index,
        initialX: 0,
        initialY: 0,
        directionX: Math.floor(Math.random() * 80 - 40),
        directionY: Math.floor(Math.random() * -50 - 10),
    }));

    return (
        <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>

            {spans.map((span) => (
                <motion.span
                    key={span.id}
                    initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
                    animate={{
                        x: span.directionX,
                        y: span.directionY,
                        opacity: 0,
                    }}
                    transition={{ duration: Math.random() * 0.5 + 0.5, ease: "easeOut" }}
                    className="absolute h-[0.5px] w-[0.5px] rounded-full bg-blue-200"
                />
            ))}
        </div>
    );
};
