import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const dotRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;

        const onMouseMove = (e) => {
            if (!visible) setVisible(true);

            // Main cursor ring — follows instantly
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;

            // Trailing dot — follows with slight delay via CSS transition
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        };

        const onMouseLeave = () => setVisible(false);
        const onMouseEnter = () => setVisible(true);

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [visible]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            {/* Outer ring cursor */}
            <div
                ref={cursorRef}
                className="custom-cursor-ring"
                style={{ opacity: visible ? 1 : 0 }}
            />
            {/* Inner emerald dot */}
            <div
                ref={dotRef}
                className="custom-cursor-dot"
                style={{ opacity: visible ? 1 : 0 }}
            />
        </>
    );
};

export default CustomCursor;
