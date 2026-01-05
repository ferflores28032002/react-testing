interface FormErrorMessageProps {
    message?: string
    className?: string
}

export function FormErrorMessage({ message, className = "" }: FormErrorMessageProps) {
    if (!message) return null

    return (
        <p className={`mt-1 text-xs text-red-600 ${className}`}>
            {message}
        </p>
    )
}
