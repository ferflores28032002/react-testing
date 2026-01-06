interface InfoSummaryItem {
    label: string
    value: string | number
}

interface InfoSummaryCardProps {
    title: string
    items: InfoSummaryItem[]
    variant?: "info" | "success" | "warning" | "error"
    className?: string
}

const VARIANT_STYLES = {
    info: {
        container: "bg-blue-50 border-blue-500",
        title: "text-blue-800",
        text: "text-blue-700",
    },
    success: {
        container: "bg-green-50 border-green-500",
        title: "text-green-800",
        text: "text-green-700",
    },
    warning: {
        container: "bg-yellow-50 border-yellow-500",
        title: "text-yellow-800",
        text: "text-yellow-700",
    },
    error: {
        container: "bg-red-50 border-red-500",
        title: "text-red-800",
        text: "text-red-700",
    },
}

export function InfoSummaryCard({
    title,
    items,
    variant = "info",
    className = "",
}: InfoSummaryCardProps) {
    const styles = VARIANT_STYLES[variant]

    return (
        <div
            className={` p-4 rounded-lg ${styles.container} ${className}`}
        >
            <h3 className={`text-sm font-semibold ${styles.title}`}>
                {title}
            </h3>

            <div className={`mt-2 text-sm space-y-1 ${styles.text}`}>
                {items.map((item, index) => (
                    <p key={index}>
                        • {item.label}: {item.value}
                    </p>
                ))}
            </div>
        </div>
    )
}
