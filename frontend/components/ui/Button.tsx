import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    loading?: boolean;
}

export default function Button({
    children,
    variant = "primary",
    size = "md",
    loading = false,
    disabled,
    className = "",
    ...props
}: ButtonProps) {
    const variants = {
        primary:
            "bg-neutral-900 text-white hover:bg-neutral-800",
        secondary:
            "bg-sky-500 text-white hover:bg-sky-600",
        outline:
            "border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50",
        ghost:
            "bg-transparent text-neutral-600 hover:bg-neutral-100",
        danger:
            "bg-red-500 text-white hover:bg-red-600",
    };

    const sizes = {
        sm: "px-3 py-2 text-xs",
        md: "px-4 py-2.5 text-sm",
        lg: "px-5 py-3 text-sm",
    };

    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-xl
        font-medium
        transition
        duration-200
        focus:outline-none
        focus:ring-2
        focus:ring-sky-500/30
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
        >
            {loading ? (
                <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Loading...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}