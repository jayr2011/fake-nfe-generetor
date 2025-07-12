import { Button } from "@/components/ui/button"

 interface ButtonProps {
    label: string;
    onClick?: () => void;
    styleClass?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    icon?: React.ElementType;
}

export function ButtonComponent({ label, onClick, styleClass, type, disabled, icon: Icon }: ButtonProps) {
  return (
    <div className="mt-5">
        <Button
          disabled={disabled}
          type={type}
          className={styleClass}
          onClick={onClick}>
            {Icon && <Icon className="mr-2" />}
            {label}
        </Button>
    </div>
  )
}

export default ButtonComponent;
