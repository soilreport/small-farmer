import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card = ({ title, children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md ${className}`}>
      {title && <h2 className="font-bold mb-2">{title}</h2>}
      {children}
    </div>
  );
};

export default Card;