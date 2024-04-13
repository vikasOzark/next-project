import { useEffect, useRef, useState } from "react";

export function useOnClickOutside({ ref, handler }) {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return; // Click inside modal
            }
            handler(event); // Click outside modal
        };

        document.addEventListener("mousedown", listener, { capture: true });

        // Cleanup function (remove event listener on unmount)
        return () => {
            document.removeEventListener("mousedown", listener, {
                capture: true,
            });
        };
    }, [ref, handler]);
}
