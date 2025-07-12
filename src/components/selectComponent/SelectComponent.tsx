import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select" 

interface SelectComponentProps {
    items: string[];
    value?: string;
    onValueChange?: (value: string) => void;
    placeholder?: string;
    width?: string;
}

function SelectComponent({ items, value, onValueChange, placeholder, width }: SelectComponentProps) {
  return (
    <Select value={value ?? ''} onValueChange={onValueChange}>
      <SelectTrigger className={width}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item, index) => (
          <SelectItem key={index} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SelectComponent;