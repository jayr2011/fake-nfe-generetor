import { Input } from "@/components/ui/input"

interface InputComponentProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
}

function InputComponent(props: InputComponentProps) {
  return (
    <div>
      <Input {...props}/>
    </div>
  );
}

export default InputComponent;