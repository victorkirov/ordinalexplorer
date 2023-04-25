type Props = {
  contentUrl: string
}

const Audio = ({ contentUrl }: Props) => {
  return (
    <>
      {/* We need this iframe in order to make autoplay work in Chrome */}
      <iframe src="silence.mp3" allow="autoplay" id="audio" style={{ display: 'none' }}></iframe>
      <audio autoPlay controls>
        <source src={contentUrl} />
      </audio>
    </>
  )
}

export default Audio
