import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={`sf-card ${className}`}>
      {title && <h2 className="sf-card__title">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;