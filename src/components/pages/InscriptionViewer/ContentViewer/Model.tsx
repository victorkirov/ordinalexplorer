import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  contentUrl: string
}

const Model = ({ contentUrl }: Props) => {
  const modelRef = useRef<Element>(null)
  const [height, setHeight] = useState(300)

  // This ensures that the model display is kept at a 1:1 aspect ratio
  useLayoutEffect(() => {
    const setCurrentHeight = () => {
      if (modelRef.current) {
        setHeight(modelRef.current.clientWidth)
      }
    }

    setCurrentHeight()

    window.addEventListener('resize', setCurrentHeight)

    return () => {
      window.removeEventListener('resize', setCurrentHeight)
    }
  }, [modelRef])

  return (
    <model-viewer
      ref={modelRef}
      camera-controls="true"
      touch-action="pan-y"
      auto-rotate="true"
      src={contentUrl}
      ar-status="not-presenting"
      style={{ width: '100%', height }}
    />
  )
}

export default Model
