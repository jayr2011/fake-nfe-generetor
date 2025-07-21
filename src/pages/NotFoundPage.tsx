import { Link } from "react-router-dom";
import notFoundImg from "@/assets/img/404.jpg";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-gray-50">
      <img
        src={notFoundImg}
        alt="Página não encontrada"
        className="w-120 h-120 object-contain mb-8 drop-shadow-lg"
      />
      <h1 className="text-4xl font-bold text-blue-600 mb-4">404 - Página não encontrada</h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl">
        Ops! A rota que você tentou acessar não existe ou foi removida.<br />
        Que tal voltar para a página inicial?
      </p>
      <Link to="/">
        <Button className="px-10">Voltar para o início</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
