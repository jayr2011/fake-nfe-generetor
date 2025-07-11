interface TextComponentProps {
    title?: string;
    subtitle?: string;
}

export function TextComponent({ title, subtitle }: TextComponentProps) {
    return (
        <div>
            {title && <h1>{title}</h1>}
            {subtitle && <h2>{subtitle}</h2>}
        </div>
    );
}