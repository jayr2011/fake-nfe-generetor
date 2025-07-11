import { TextComponent } from "../../components/textComponent/TextComponent";
import { ButtonComponent } from "../../components/buttons/ButtonComponent";
import { useNavigate } from "react-router";

const nfePageSubtitle = "Bem-vindo ao Emissor de Notas Fiscais! Gere suas Notas Fiscais Eletrônicas de forma rápida, simples e segura. Preencha os dados do cliente, dos produtos ou serviços e baixe a DANFE em PDF em poucos segundos."
const buttonLinkLabel = "Clique aqui para emitir sua nota";

function NfePage() {
  const navigate = useNavigate();

  function handleIssueInvoice() {
    navigate("/nfe-form");
  }

  return (
    <div className="mx-3 flex flex-col justify-center items-center">
      <TextComponent subtitle={nfePageSubtitle} />
      <ButtonComponent label={buttonLinkLabel} onClick={handleIssueInvoice}/>
    </div>
  );
}

export default NfePage;