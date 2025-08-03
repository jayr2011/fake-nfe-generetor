import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { maskCpfCnpj } from "@/lib/regex";

export interface RegisterFormValues {
  name: string;
  email: string;
  documentNumber: string;
  password: string;
  confirmPassword: string;
}

export const registerSchema = z.object({
  name: z.string().min(2, "deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  documentNumber: z.string().refine(
    value => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 11 && digits.length <= 14;
    },
    {
      message: "Documento deve conter entre 11 e 14 dígitos",
    }
  ),
  password: z.string().min(6, "deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirme sua senha"),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  }
);

export function useRegisterFormController() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  function onSubmit(data: RegisterFormValues) {
    alert("Cadastro realizado com sucesso!" + "\n" + JSON.stringify(data, null, 2));
  }

  function handleDocumentChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = maskCpfCnpj(e.target.value);
    setValue("documentNumber", masked);
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleDocumentChange,
  };
}
