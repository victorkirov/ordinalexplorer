import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const NFTViewer = () => {
  const { id } = useParams()
  const [img, setImg] = useState('')
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')
  const [audio, setAudio] = useState('')
  const [threeD, setThreeD] = useState('')
  const [html, setHtml] = useState('')
  const [name, setName] = useState('')
  const [metadata, setMetadata] = useState({})

  useEffect(() => {
    axios.get('https://api.xverse.app/v1/ordinals/' + id).then(res => {
      console.log(res.data)

      setName(res.data.inscriptionNumber)
      setMetadata(res.data.metadata)

      if (`${res.data.metadata['content type']}`.startsWith('text/plain')) {
        axios.get(`https://ordinals.com${res.data.metadata.content}`, { crossDomain: true }).then(res2 => {
          console.log('2', res2)
          setText(JSON.stringify(res2.data))
        })
      } else if (`${res.data.metadata['content type']}`.startsWith('video/')) {
        setVideo(res.data.metadata.content)
      } else if (`${res.data.metadata['content type']}`.startsWith('audio/')) {
        setAudio(res.data.metadata.content)
      } else if (`${res.data.metadata['content type']}`.startsWith('model/')) {
        setThreeD(res.data.metadata.content)
      } else if (`${res.data.metadata['content type']}`.startsWith('text/html')) {
        setHtml(res.data.metadata.content)
      } else if (`${res.data.metadata['content type']}`.startsWith('image/')) {
        setImg(res.data.metadata.content)
      } else {
        // handle unknown type here
      }
    })
  }, [])
  return (
    <span>
      <iframe src="silence.mp3" allow="autoplay" id="audio" style={{ display: 'none' }}></iframe>
      {/* TODO: add back arrow */}
      Details
      <br />
      {img && <img src={`https://ordinals.com${img}`} alt="NFT" />}
      {video && (
        <video controls muted loop autoPlay>
          <source src={`https://ordinals.com${video}`} />
        </video>
      )}
      {audio && (
        <audio autoPlay controls>
          <source src={`https://ordinals.com${audio}`} />
        </audio>
      )}
      {text}
      {threeD && (
        <model-viewer
          camera-controls="true"
          touch-action="pan-y"
          auto-rotate="true"
          src={`https://ordinals.com${threeD}`}
          ar-status="not-presenting"
          style={{ width: '200px', height: '200px' }}
        ></model-viewer>
      )}
      {html && (
        <iframe
          sandbox="allow-scripts"
          title="Inscription Iframe"
          loading="lazy"
          src={`https://ordinals.com${html}`}
        ></iframe>
      )}
      {metadata && (
        <div>
          <p>{name}</p>
          <p>Inscription ID</p>
          <p>{metadata.id}</p>
          <p>Owner Address</p>
          <p>{metadata.address}</p>

          <h4>Attributes</h4>
          <p>Output Value</p>
          <p>{metadata['output value']}</p>
          <p>Content Type</p>
          <p>{metadata['content type']}</p>
          <p>Content Length</p>
          <p>{metadata['content length']}</p>
          <p>Location</p>
          <p>{metadata.location}</p>
          <p>Genesis Transaction</p>
          <p>{metadata['genesis transaction'].split('/')[2]}</p>
        </div>
      )}
    </span>
  )
}

export default NFTViewer
