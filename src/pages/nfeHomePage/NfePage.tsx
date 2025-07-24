import { TextComponent } from "../../components/textComponent/TextComponent";
import { ButtonComponent } from "../../components/buttons/ButtonComponent";
import { useNavigate } from "react-router";
import { FileText } from "lucide-react";
import { useUserContext } from "@/context/userContext/UserContext";
import img from "../../assets/img/documento-de-remessa-pagina-inicial-da-conexao-laptop.jpg";

const TEXT_PAGE = {
  NFE_TITLE: "Bem-vindo ao Emissor de Notas Fiscais! Gere suas Notas Fiscais Eletrônicas de forma rápida, simples e segura. Preencha os dados do cliente, dos produtos ou serviços e baixe a DANFE em PDF em poucos segundos.",
  BUTTON_LINK_LABEL: "Clique aqui para emitir sua nota",
}

function NfePage() {

  const { user } = useUserContext();

  const navigate = useNavigate();
  function handleIssueInvoice() {
    navigate("/nfe-form");
  }

  return (
    <div className="flex flex-col items-center h-screen p-4 md:items-start">
      <div className="mb-5 flex flex-col items-start">
        { user ? <div className="text-2xl">{`seja bem-vindo ${user.name}`}</div> : null}
      </div>
      <TextComponent subtitle={TEXT_PAGE.NFE_TITLE} />
      <img className="w-full max-w-[600px] h-auto rounded-lg shadow-md mt-4 object-cover" src={img} alt="Pessoa segurando nota fiscal em frente ao notebook" />
      <div className="md:mt-10 mt-4">
        <ButtonComponent icon={FileText} label={TEXT_PAGE.BUTTON_LINK_LABEL} onClick={handleIssueInvoice}/>
      </div>
    </div>
  );
}

export default NfePage;