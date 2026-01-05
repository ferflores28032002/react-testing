interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card = ({ children, className = '', hover = false }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 ${
      hover ? 'hover:scale-[1.02] transition-all duration-300' : ''
    } ${className}`}>
      {children}
    </div>
  );
};
