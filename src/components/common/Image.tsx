import { IGetFileQuery } from "../../interfaces";
import { useObjToQueryString } from "../../hooks/useObjToQueryString";

interface Props {
  altText?: string;
  className?: string;
  query?: IGetFileQuery;
  src?: string;
}

function Image({ query, altText = "", className = "", src }: Props) {
  let source;
  if (query) {
    const queryString = useObjToQueryString(query);
    source = `http://127.0.0.1:3500/api/v1/files?${queryString}`;
  } else source = src;
  return (
    <img src={source} alt={altText} className={className} />
  );
}

export default Image;
