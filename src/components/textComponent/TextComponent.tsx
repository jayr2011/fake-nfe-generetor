interface TextComponentProps {
    title?: string;
    subtitle?: string;
}

export function TextComponent({ title, subtitle }: TextComponentProps) {
    return (
        <div className="w-full max-w-[320px] text-justify md:max-w-full md:text-left">
            {title && <h1>{title}</h1>}
            {subtitle && <h2>{subtitle}</h2>}
        </div>
    );
}