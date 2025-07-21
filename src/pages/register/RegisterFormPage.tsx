import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRegisterFormController } from "./registerForm.controller";
import AlertComponent from "@/components/alertComponent/AlertComponent";
import {useState} from "react";

export function RegisterFormPage() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleDocumentChange,
    } = useRegisterFormController();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function handleInvalidSubmit() {
    const errorFields = Object.entries(errors)
      .filter(([, value]) => value?.message)
      .map(([key, value]) => `${key}: ${value?.message}`);
    if (errorFields.length > 0) {
      setAlertMsg(`Os seguintes campos são obrigatórios ou estão incorretos:\n\n${errorFields.join("\n")}`);
      setAlertOpen(true);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
      <AlertComponent
        title="Erro ao cadastrar"
        description={alertMsg}
        cancelButtonText="Fechar"
        open={alertOpen}
        openChange={setAlertOpen}
      />
      <form
        onSubmit={handleSubmit(onSubmit, handleInvalidSubmit)}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
        autoComplete="off"
      >
        <h1 className="text-2xl font-bold text-blue-600 mb-2 text-center">Cadastro de Usuário</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
          <Input
            id="name"
            placeholder="Digite seu nome completo"
            {...register("name")}
          />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
          <Input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            {...register("email")}
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="documentNumber" className="text-sm font-medium text-gray-700">Documento (CPF/CNPJ)</label>
          <Input
            id="documentNumber"
            type="text"
            placeholder="CPF/CNPJ"
            {...register("documentNumber")}
            onChange={handleDocumentChange}
            maxLength={18}
          />
          {errors.documentNumber && <span className="text-xs text-red-500">{errors.documentNumber.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
          <Input
            id="password"
            type="password"
            placeholder="Crie uma senha"
            {...register("password")}
          />
          {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirme sua senha</label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirme sua senha"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>}
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 mt-4"
          disabled={isSubmitting}
        >
          Realizar cadastro
        </Button>
      </form>
    </div>
  );
}

export default RegisterFormPage;
