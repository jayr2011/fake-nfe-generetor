function NavBar() {
    return (
        <>
            <nav className="bg-gray-100 border-b border-gray-200">
                <span className="text-xl font-bold text-blue-400 tracking-tight flex justify-center">Nota Brasil</span>
                <div className="max-w-7xl px-2 py-4 flex items-center justify-center">
                    <ul className="flex space-x-8 text-sm font-medium text-gray-800">
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 transition-colors duration-150"
                            >
                                Início
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 transition-colors duration-150"
                            >
                                Gerar Nota Fiscal
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="hover:text-red-600 transition-colors duration-150"
                            >
                                Sobre Nós
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar;