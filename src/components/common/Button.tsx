import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
  color: string;
  size?: string;
  className?: string;
  onClick?: () => void;
  link?: string;
  disabled?: boolean;
}

function Button({
  children,
  color,
  size,
  className = "",
  onClick,
  link,
  disabled = false,
}: Props) {
  return (
    <>
      {!link ? (
        <button
          className={`btn btn-${color} btn-${size} ${className}`}
          onClick={onClick}
          disabled={disabled}
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
