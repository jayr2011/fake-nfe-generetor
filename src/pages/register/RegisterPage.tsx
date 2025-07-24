import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react';

export function RegisterPage() {

  const navigate = useNavigate();

  return (
    <div>
      <Button
        className="px-6 text-[16px] text-blue-500"
        variant="ghost"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="size-5"/>
        Voltar
      </Button>
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Cadastre-se e tenha mais comodidade!</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Ao se registrar, você poderá salvar suas notas fiscais eletrônicas (NFEs) e acessá-las facilmente quando precisar. Tenha praticidade, segurança e agilidade para consultar e gerenciar suas notas a qualquer momento, de qualquer dispositivo.
      </p>
      <Link to="/register-form">
        <Button className="px-20 bg-blue-500 from-blue-500 to-blue-700">Fazer meu cadastro</Button>
      </Link>
      <div className= "mt-8 flex flex-col items-center">
        <span className="text-gray-600 mb-2">Já tem cadastro?</span>
        <Link to="/login">
          <Button className="px-24 bg-blue-100 text-blue-700 border border-blue-400 hover:bg-blue-200 transition-colors" variant="outline">Faça seu login</Button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default RegisterPage;