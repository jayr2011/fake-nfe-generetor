import { nfeFormMock } from '../../mocks/nfeFormMock';
import { formatDate } from '@/lib/utils';

function MyNfe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Minhas Notas Fiscais</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {nfeFormMock.map((nfe: import('../../interfaces/formInterface').NfeFormInterface) => (
          <div
            key={nfe.issuer.cpfCnpj}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-[1.03] transition-transform duration-200 border border-gray-100"
          >
            <div>
              <div className="text-lg font-semibold text-gray-800 mb-1">{nfe.recipient.corporateName}</div>
              <div className="text-sm text-gray-500 mb-2">Emitida em: {formatDate(nfe.service.createdAt)}</div>
              <div className="text-xl font-bold text-blue-500 mb-4">R$ {nfe.service.unitValue}</div>
              <div className="text-sm text-gray-500 mb-2">{nfe.service.description}</div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="w-full py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                type="button"
              >
                Visualizar NFS-e
              </button>
              <button
                className="w-full py-2 rounded-lg bg-gray-100 text-blue-500 font-semibold border border-blue-300 hover:bg-blue-50 transition-colors"
                type="button"
              >
                Compartilhar
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center text-gray-400 text-sm">Exibindo prévias mockadas. Em breve, suas notas reais aparecerão aqui.</div>
    </div>
  );
}

export default MyNfe;