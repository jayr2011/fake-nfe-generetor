import { Link, useLocation } from "react-router-dom"
import brazilLogo from "@/assets/img/brazil.png";

import { useState, useRef } from "react";

export function NavBar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);

    function isActive(path: string) {
        return location.pathname === path;
    }

    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setMenuOpen(false);
        }
    }

    return (
        <nav className="bg-gray-100 border-b border-gray-200">
            <div className="max-w-7xl px-2 py-4 flex flex-row-reverse items-center justify-end md:flex-row md:items-center md:justify-start md:gap-0 relative">
                <Link to="/" className="text-2xl font-bold text-blue-400 tracking-tight flex items-center gap-2 md:mb-0 md:mr-8">
                    Nota Brasil
                    <img src={brazilLogo} alt="Logo Brasil" className="w-6 h-6" />
                </Link>
                <button
                    className="md:hidden mb-2 mr-22 mt-2 z-50"
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
                {/* Menu padrão para md+ */}
                <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-800 md:ml-0 md:pl-0">
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
                            Gerar Nfe
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
                    <li>
                        <Link
                            to="/my-nfe"
                            className={`hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/my-nfe") ? "bg-blue-100 rounded-md px-2 py-1" : ""}`}
                        >
                            Minhas NFEs
                        </Link>
                    </li>
                </ul>
                {menuOpen && (
                    <>
                        <div
                            className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden"
                            onClick={handleOverlayClick}
                        />
                        <ul
                            ref={menuRef}
                            className="flex flex-col fixed top-16 left-0 w-full bg-white shadow-lg rounded-b z-50 md:hidden p-[5px]"
                            style={{ opacity: menuOpen ? 1 : 0, translate: menuOpen ? '0' : '0 -20px' }}
                        >
                            <li>
                                <Link
                                    to="/"
                                    className={`block px-4 py-3 border-b border-gray-200 hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Início
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/nfe-form"
                                    className={`block px-4 py-3 border-b border-gray-200 hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/nfe-form") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Gerar Nfe
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className={`block px-4 py-3 border-b border-gray-200 hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/about") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/my-nfe"
                                    className={`block px-4 py-3 hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/my-nfe") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Minhas NFEs
                                </Link>
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </nav>
    );
}

export default NavBar;