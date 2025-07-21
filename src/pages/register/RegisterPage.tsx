import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"

export function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Cadastre-se e tenha mais comodidade!</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Ao se registrar, você poderá salvar suas notas fiscais eletrônicas (NFEs) e acessá-las facilmente quando precisar. Tenha praticidade, segurança e agilidade para consultar e gerenciar suas notas a qualquer momento, de qualquer dispositivo.
      </p>
      <Link
        to="/register-form"
      >
        <Button className="px-20 from-blue-500 to-blue-700">Fazer meu cadastro</Button>
      </Link>
    </div>
  );
}

export default RegisterPage;