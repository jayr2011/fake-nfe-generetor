export function Footer() {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-200 py-4 mt-8 text-center text-sm text-gray-600">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <span className="font-semibold">Desenvolvido por Jair Costa</span>
        <span className="mt-2 md:mt-0">&copy; {new Date().getFullYear()} Fake NFe Generator</span>
        <span className="mt-2 md:mt-0">Contato: contato@jaircosta.dev</span>
      </div>
    </footer>
  );
}
