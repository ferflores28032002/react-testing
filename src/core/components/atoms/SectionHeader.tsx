interface SectionHeaderProps {
    title: string
    description?: string
    className?: string
}

export function SectionHeader({
    title,
    description,
    className = "",
}: SectionHeaderProps) {
    return (
        <div className={className}>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {title}
            </h2>

            {description && (
                <p className="text-gray-600">
                    {description}
                </p>
            )}
        </div>
    )
}
