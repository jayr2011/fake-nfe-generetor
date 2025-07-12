import { Link, useLocation } from "react-router-dom"
import brazilLogo from "@/assets/img/brazil.png";

function NavBar() {
    const location = useLocation();

    function isActive(path: string) {
        return location.pathname === path;
    }

    return (
        <>
            <nav className="bg-gray-100 border-b border-gray-200">
                <div className="max-w-7xl px-2 py-4 flex flex-col items-center justify-center md:flex-row md:items-center md:justify-start md:gap-0">
                    <Link to="/" className="text-2xl font-bold text-blue-400 tracking-tight mb-4 flex items-center gap-2 md:mb-0 md:mr-8">
                        Nota Brasil
                        <img src={brazilLogo} alt="Logo Brasil" className="w-6 h-6" />
                    </Link>
                    <ul className="flex space-x-8 text-sm font-medium text-gray-800 md:ml-0 md:pl-0">
                        <li>
                            <Link
                                to="/"
                                className={`hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/") ? "bg-blue-100 rounded-md px-2 py-1" : ""}`}
                            >
                                Início
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/nfe-form"
                                className={`hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/nfe-form") ? "bg-blue-100 rounded-md px-2 py-1" : ""}`}
                            >
                                Gerar Nota Fiscal
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className={`hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/about") ? "bg-blue-100 rounded-md px-2 py-1" : ""}`}
                            >
                                Sobre Nós
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default NavBar;