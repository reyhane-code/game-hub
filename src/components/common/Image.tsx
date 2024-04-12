interface Props {
  source: string;
  altText?: string;
  width: string;
  height: string;
  styles?: string;
}

function Image({ source, altText = "", width, height, styles = "" }: Props) {
  return (
    <div>
      <img
        src={source}
        alt={altText}
        className={`w-${width} h-${height} ${styles}`}
      />
    </div>
  );
}

export default Image;
