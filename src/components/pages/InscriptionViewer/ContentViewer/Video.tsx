type Props = {
  contentUrl: string
}

const Video = ({ contentUrl }: Props) => {
  return (
    <video controls muted loop autoPlay style={{ width: '100%' }}>
      <source src={contentUrl} />
    </video>
  )
}

export default Video
