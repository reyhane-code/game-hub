import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  color: string;
  size?: string;
  fontWeight?: string;
  margin?: string;
  styles?: string;
  onClick: () => void;
  link?: string;
}

function Button({
  children,
  color,
  size,
  fontWeight = "bold",
  margin = "m-0",
  styles = "",
  onClick,
  link,
}: Props) {
  return (
    <>
      {!link ? (
        <button
          className={`btn btn-${color} btn-${size} ${margin} font-${fontWeight} ${styles}`}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <Link
          to={link}
          className={`btn btn-${color} btn-${size} ${margin} font-${fontWeight} ${styles}`}
        >
          {children}
        </Link>
      )}
    </>
  );
}

export default Button;
