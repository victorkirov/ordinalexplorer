import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  contentUrl: string
}

const HTML = ({ contentUrl }: Props) => {
  const modelRef = useRef<HTMLDivElement>(null)
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
    <div style={{ width: '100%' }} ref={modelRef}>
      <iframe
        style={{ width: '100%', height, border: 'none' }}
        sandbox="allow-scripts"
        title="Inscription Iframe"
        loading="lazy"
        src={contentUrl}
      ></iframe>
    </div>
  )
}

export default HTML
