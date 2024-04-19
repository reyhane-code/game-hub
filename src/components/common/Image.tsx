interface Props {
  src: string;
  altText?: string;
  className?: string;
}

function Image({ src, altText = "", className = "" }: Props) {
  return (
    <div>
      <img src={src} alt={altText} className={className} />
    </div>
  );
}

export default Image;
