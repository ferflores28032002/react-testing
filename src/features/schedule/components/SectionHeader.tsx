interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 text-center ${className}`}>
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
        {title}
      </h1>

      {subtitle && (
        <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
