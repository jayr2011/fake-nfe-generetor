import InputComponent from "../../components/input/InputComponent";
import ButtonComponent from "@/components/buttons/ButtonComponent";
import AlertComponent from "@/components/alertComponent/AlertComponent";
import nfseLogo from "@/assets/img/nfse.png";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea"
import { useNfeFormController as useNfeFormControllerEn } from "./nfeForm.controller";
import { formatToBRL } from "@/lib/formatToBRL";
import SelectComponent from "@/components/selectComponent/SelectComponent";
import { BrushCleaning, FileCheck2 } from "lucide-react";


function NfeFormPage() {
  function handleUnitValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d]/g, "");
    const numeric = raw ? String(parseInt(raw, 10)).padStart(3, "0") : "000";
    handleChange({
      target: {
        name: "service.unitValue",
        value: (parseInt(numeric, 10) / 100).toString(),
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>);
  }
  const {
    values,
    handleChange,
    handleSubmit,
    handleResetClick,
    handleConfirmReset,
    isOpen,
    close,
    issuerAddressData,
    recipientAddressData,
    issuerIsLoading,
    recipientIsLoading,
    issuerCepError,
    recipientCepError,
    recipientCityDisabled,
    issuerCpfError,
    recipientCpfError,
    handleOpenConfirmAlert,
    isConfirmAlert,
    closeConfirmAlert,
    handleConfirmNoteCriation
  } = useNfeFormControllerEn();

  return (
    <div className="nfe-form px-3 py-3 flex flex-col">
      {isOpen && (
      <AlertComponent
        title="Atenção"
        description="Você irá apagar todos os dados preenchidos no formulário."
        cancelButtonText="Cancelar"
        actionButtonText="Confirmar"
        onClickAction={handleConfirmReset}
        onClickCancel={close}
        open={isOpen}
        openChange={open => open ? open : close()}
      />
      )}
      {isConfirmAlert() && (
      <AlertComponent
        title="Atenção"
        description="Você irá gerar uma nota fiscal de teste, mas tenha em mente que a mesma é para efeito de um projeto pessoal e não tem validade legal."
        cancelButtonText="CANCELAR"
        actionButtonText="GERAR NFS-e"
        onClickAction={() => handleConfirmNoteCriation(values)}
        onClickCancel={closeConfirmAlert}
        open={isConfirmAlert()}
        openChange={open => open ? open : close()}
      />
      )}
      <img
        src={nfseLogo}
        alt="Logo NFS-e"
        className="mx-auto mb-2 w-[260px] h-[180px] sm:w-[320px] sm:h-[220px] md:w-[360px] md:h-[250px]"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <h1 className="nfe-form__title text-2xl font-bold mb-4">Emissão de Nota Fiscal de Serviço Eletrônica (NFS-e)</h1>
      <p className="nfe-form__description mt-4 text-gray-600">
        Preencha os dados do cliente, dos serviços prestados e baixe a NFS-e (Nota Fiscal de Serviço Eletrônica) em PDF em poucos segundos.
      </p>
      <div className="nfe-form__form">
        <form onSubmit={handleSubmit} method="post" className="nfe-form__fields flex flex-col">
          <div className="nfe-form__input-group-company  mt-2">
          <h2 className="nfe-form__subtitle text-xl font-semibold mb-2">Dados do Emitente</h2>
            <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="CNPJ/CPF" name="issuer.cpfCnpj" value={values.issuer.cpfCnpj} onChange={handleChange} />
            {issuerCpfError && <div className="text-xs text-red-500 mt-1">{issuerCpfError}</div>}
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="Razão Social" name="issuer.corporateName" value={values.issuer.corporateName} onChange={handleChange} />
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="Nome Fantasia" name="issuer.tradeName" value={values.issuer.tradeName} onChange={handleChange} />
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="Endereço (logradouro, número, bairro)" name="issuer.address" value={values.issuer.address} onChange={handleChange} />
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="CEP" name="issuer.zipCode" value={values.issuer.zipCode} onChange={handleChange} />
            {issuerIsLoading && values.issuer.zipCode.replace(/\D/g, "").length === 8 && <Skeleton className="w-full h-6 mt-2" />}
            {issuerAddressData && values.issuer.zipCode.replace(/\D/g, "").length === 8 && (
              <div className="text-xs text-gray-700 mt-2">
                {issuerAddressData.logradouro} - {issuerAddressData.bairro} - {issuerAddressData.localidade}/{issuerAddressData.uf}
              </div>
            )}
            {issuerCepError && <div className="text-xs text-red-500 mt-2">{issuerCepError}</div>}
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="tel" placeholder="Telefone" name="issuer.phone" value={values.issuer.phone} onChange={handleChange} />
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="email" placeholder="E-mail" name="issuer.email" value={values.issuer.email} onChange={handleChange} />
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="Inscrição Estadual" name="issuer.stateRegistration" value={values.issuer.stateRegistration} onChange={handleChange} />
          </div>
          <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="Inscrição Municipal" name="issuer.municipalRegistration" value={values.issuer.municipalRegistration} onChange={handleChange} />
          </div>
          <div className="nfe-form__field mt-2">
            <SelectComponent
              width="w-full"
              items={["MEI", "Simples Nacional"]}
              placeholder="Regime Tributário"
              value={values.issuer.taxRegime}
              onValueChange={value => handleChange({
                target: {
                  name: "issuer.taxRegime",
                  value,
                }
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any)}
            />
          </div>
          </div>
          <div className="nfe-form__input-group-client mt-4">
          <h2 className="nfe-form__subtitle text-xl font-semibold mb-2">Dados do Destinatário</h2>
            <div className="nfe-form__field mt-2">
            <InputComponent type="text" placeholder="CNPJ/CPF" name="recipient.cpfCnpj" value={values.recipient.cpfCnpj} onChange={handleChange} />
            {recipientCpfError && <div className="text-xs text-red-500 mt-1">{recipientCpfError}</div>}
            </div>
            <div className="nfe-form__field mt-2">
              <InputComponent type="text" placeholder="Nome/Razão Social" name="recipient.corporateName" value={values.recipient.corporateName} onChange={handleChange} />
            </div>
            <div className="nfe-form__field mt-2">
              <InputComponent type="text" placeholder="CEP" name="recipient.zipCode" value={values.recipient.zipCode} onChange={handleChange} />
              {recipientIsLoading && values.recipient.zipCode.replace(/\D/g, "").length === 8 && <Skeleton className="w-full h-6 mt-2" />}
              {recipientAddressData && values.recipient.zipCode.replace(/\D/g, "").length === 8 && (
                <div className="text-xs text-gray-700 mt-2">
                  {recipientAddressData.logradouro} - {recipientAddressData.bairro} - {recipientAddressData.localidade}/{recipientAddressData.uf}
                </div>
              )}
              {recipientCepError && <div className="text-xs text-red-500 mt-1">{recipientCepError}</div>}
            </div>
            <div className="nfe-form__field mt-2">
              <InputComponent type="text" placeholder="Endereço (logradouro, número, bairro)" name="recipient.address" value={values.recipient.address} onChange={handleChange} />
            </div>
            <div className="nfe-form__field mt-2">
              <InputComponent type="text" placeholder="Município" name="recipient.city" value={values.recipient.city} onChange={handleChange} disabled={recipientCityDisabled} />
            </div>
            <div className="nfe-form__field mt-2">
              <InputComponent type="text" placeholder="Inscrição Estadual" name="recipient.stateRegistration" value={values.recipient.stateRegistration} onChange={handleChange} />
            </div>
            <div className="nfe-form__field mt-2">
              <InputComponent type="text" placeholder="Inscrição Municipal" name="recipient.municipalRegistration" value={values.recipient.municipalRegistration} onChange={handleChange} />
            </div>
            <div className="nfe-form__field mt-2">
              <InputComponent type="text" placeholder="Telefone" name="recipient.phone" value={values.recipient.phone} onChange={handleChange} />
            </div>
            <div className="nfe-form__input-services text-xl font-semibold mt-4">
              <h2>Discriminação dos Serviços</h2>
              <div className="nfe-form__field mt-2">
                <InputComponent type="number" placeholder="Código do Serviço" name="service.serviceCode" value={values.service.serviceCode} onChange={handleChange} />  
              </div>
              <div className="nfe-form__field mt-2">
                <Textarea placeholder="Descrição detalhada do serviço" name="service.description" value={values.service.description} onChange={handleChange} />
              </div>
              <div className="nfe-form__field mt-2">
                <InputComponent
                  type="text"
                  placeholder="Valor Unitário"
                  name="service.unitValue"
                  value={formatToBRL(values.service.unitValue)}
                  onChange={handleUnitValueChange}
                />
              </div>
              <div className="nfe-form__field mt-2">
                <InputComponent type="number" placeholder="Quantidade" name="service.quantity" value={values.service.quantity} onChange={handleChange} />
              </div>
              <div className="nfe-form__field mt-2">
                <InputComponent type="number" placeholder="Desconto Incondicional (opcional)" name="service.discount" value={values.service.discount} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="nfe-form__button flex justify-center mt-5">
            <ButtonComponent icon={FileCheck2} onClick={handleOpenConfirmAlert} type="button" styleClass="w-56" label="Gerar DANFE" />
          </div>
          <div className="nfe-form__reset-button flex justify-center mt-2">
            <ButtonComponent icon={BrushCleaning} type="button" onClick={handleResetClick} styleClass="w-56" label="Limpar formuário" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default NfeFormPage;