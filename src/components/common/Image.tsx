interface Props {
  source: string;
  altText?: string;
  className?: string;
}

function Image({ source, altText = "", className = "" }: Props) {
  return (
    <div>
      <img src={source} alt={altText} className={className} />
    </div>
  );
}

export default Image;
