import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  color: string;
  size?: string;
  className?: string;
  onClick: () => void;
  link?: string;
}

function Button({
  children,
  color,
  size,
  className = "",
  onClick,
  link,
}: Props) {
  return (
    <>
      {!link ? (
        <button
          className={`btn btn-${color} btn-${size} ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      ) : (
        <Link to={link} className={`btn btn-${color} btn-${size} ${className}`}>
          {children}
        </Link>
      )}
    </>
  );
}

export default Button;
