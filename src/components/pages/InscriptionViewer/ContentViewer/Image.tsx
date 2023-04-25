type Props = {
  contentUrl: string
}

const Image = ({ contentUrl }: Props) => {
  return <img style={{ width: '100%' }} src={contentUrl} alt="Inscription Image Content" />
}

export default Image
