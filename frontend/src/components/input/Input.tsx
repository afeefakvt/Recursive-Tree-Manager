import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface InputFieldProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
  buttonText?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  onChange,
  onSubmit,
  buttonText = "Add",
}) => {
  return (
    <div className="flex gap-2 items-center mt-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-48"
      />
      <Button onClick={onSubmit} disabled={!value.trim()}>
        {buttonText}
      </Button>
    </div>
  );
};

export default InputField;
