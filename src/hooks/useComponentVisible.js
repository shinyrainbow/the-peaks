import { useState, useEffect, useRef } from 'react';

const useComponentVisible = (initialIsVisible, initialHasInputValue = false) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const [hasInputValue, setHasInputValue] = useState(initialHasInputValue)
    const ref = useRef(null);

    // const handleHideDropdown = (event) => {
    //     if (event.key === 'Escape') {
    //         setIsComponentVisible(false);
    //     }
    // };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target) && !hasInputValue) {
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {
        // document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            // document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return { ref, hasInputValue, setHasInputValue, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible