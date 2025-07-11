import { Button } from "@/components/ui/button"

 interface ButtonProps {
    label: string;
    onClick?: () => void;
    styleClass?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export function ButtonComponent({ label, onClick, styleClass, type, disabled }: ButtonProps) {
  return (
    <div className="mt-5">
        <Button disabled={disabled} type={type} className={styleClass} onClick={onClick}>{label}</Button>
    </div>
  )
}

export default ButtonComponent;
