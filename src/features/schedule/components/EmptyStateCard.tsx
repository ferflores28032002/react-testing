import { Card } from "../../../core/components/atoms/Card"

interface EmptyStateCardProps {
    title: string
    description?: string
    className?: string
}

export function EmptyStateCard({
    title,
    description,
    className = "",
}: EmptyStateCardProps) {
    return (
        <Card className={`p-12 text-center ${className}`}>
            <div className="max-w-md mx-auto">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {title}
                </h3>

                {description && (
                    <p className="text-gray-600">
                        {description}
                    </p>
                )}
            </div>
        </Card>
    )
}
