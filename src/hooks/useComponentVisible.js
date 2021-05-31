import { useState, useEffect, useRef } from 'react'

const useComponentVisible = (initialIsVisible, initialHasInputValue = false) => {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible)
    const [hasInputValue, setHasInputValue] = useState(initialHasInputValue)
    const ref = useRef(null)

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target) && !hasInputValue) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    return { ref, hasInputValue, setHasInputValue, isComponentVisible, setIsComponentVisible }
}

export default useComponentVisible