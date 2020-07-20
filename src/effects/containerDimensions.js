import { useEffect, useState } from "react"
import { debounce } from "lodash"

export const useContainerDimensions = (
  ref,
  { updateOnResize = true, debounceWait = 1000 } = {}
) => {
  const getDimensions = () => ({
    width: ref.current.offsetWidth,
    height: ref.current.offsetHeight
  })

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = debounce(() => {
      setDimensions(getDimensions())
    }, debounceWait)
    if (ref.current) {
      setDimensions(getDimensions())
    }

    updateOnResize && window.addEventListener("resize", handleResize)

    return () => {
      updateOnResize && window.removeEventListener("resize", handleResize)
    }
  }, [ref])

  return dimensions
}
