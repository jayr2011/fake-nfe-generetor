import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AlertComponent from "@/components/alertComponent/AlertComponent";
import { useState } from "react";
import { useLoginController } from "./useLogin.controller";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from 'lucide-react';

export function LoginPage() {
  const { handleLogin, loading } = useLoginController();

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setAlertMsg("Preencha todos os campos.");
      setAlertOpen(true);
      return;
    }
    const result = await handleLogin({ email: form.email, password: form.password });
    setAlertMsg(result.message);
    setAlertOpen(true);
    if( result.success && result.user) {
      navigate("/");
    }
  }

  return (
    <div className="bg-gray-50">
    <Button
        className="px-6 text-[16px] text-blue-500"
        variant="ghost"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="size-5"/>
        Voltar
      </Button>
    <div className="flex flex-col items-center justify-center h-screen px-4 bg-gray-50">
      <AlertComponent
        title="Login"
        description={alertMsg}
        cancelButtonText="Fechar"
        open={alertOpen}
        openChange={setAlertOpen}
      />
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col gap-6"
        autoComplete="off"
      >
        <h1 className="text-2xl font-bold text-blue-600 mb-2 text-center">Login</h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-200 mt-4"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </div>
    </div>
  );
}

export default LoginPage;
