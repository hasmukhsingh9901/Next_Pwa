import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState<boolean>(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        // Initial check
        setMatches(mediaQueryList.matches);

        // Callback for media query change
        const updateMatches = (e: MediaQueryListEvent) => setMatches(e.matches);

        mediaQueryList.addEventListener("change", updateMatches);

        // Cleanup listener on component unmount
        return () => {
            mediaQueryList.removeEventListener("change", updateMatches);
        };
    }, [query]); // Add 'query' as a dependency

    return matches;
};
