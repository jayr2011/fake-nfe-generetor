import { TextComponent } from "../../components/textComponent/TextComponent";
import { ButtonComponent } from "../../components/buttons/ButtonComponent";
import { useNavigate } from "react-router";
import { FileText } from "lucide-react";

const nfePageSubtitle = "Bem-vindo ao Emissor de Notas Fiscais! Gere suas Notas Fiscais Eletrônicas de forma rápida, simples e segura. Preencha os dados do cliente, dos produtos ou serviços e baixe a DANFE em PDF em poucos segundos."
const buttonLinkLabel = "Clique aqui para emitir sua nota";

function NfePage() {
  const navigate = useNavigate();

  function handleIssueInvoice() {
    navigate("/nfe-form");
  }

  return (
    <div className="flex flex-col items-center h-screen p-4 md:items-start">
      <TextComponent subtitle={nfePageSubtitle} />
      <div className="md:mt-10 mt-4">
        <ButtonComponent icon={FileText} label={buttonLinkLabel} onClick={handleIssueInvoice}/>
      </div>
    </div>
  );
}

export default NfePage;