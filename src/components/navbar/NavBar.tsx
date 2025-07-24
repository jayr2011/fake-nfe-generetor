import { Link, useLocation } from "react-router-dom"
import brazilLogo from "@/assets/img/brazil.png";

import { useState, useRef, useEffect } from "react";
import { useUserContext } from "@/context/userContext/UserContext";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";

export function NavBar() {
    const { user, clearUser } = useUserContext();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const menuRef = useRef<HTMLUListElement>(null);

    function isActive(path: string) {
        return location.pathname === path;
    }

    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            handleMenuClose();
        }
    }

    function handleMenuToggle() {
        if (menuOpen) {
            handleMenuClose();
        } else {
            handleMenuOpen();
        }
    }

    function handleMenuOpen() {
        setMenuOpen(true);
        setTimeout(() => setIsAnimating(true), 10);
    }

    function handleMenuClose() {
        setIsAnimating(false);
        setTimeout(() => setMenuOpen(false), 300);
    }

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === 'Escape' && menuOpen) {
                handleMenuClose();
            }
        }

        if (menuOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    return (
        <nav className="bg-gray-100 border-b border-gray-200">
            <div className="max-w-7xl px-2 py-4 flex flex-row-reverse items-center justify-between md:flex-row md:items-center md:justify-start md:gap-0 relative">
                {user ? (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                className="font-semibold"
                                aria-label="Sair"
                            >
                                Sair
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Você será desconectado da sua conta e precisará fazer login novamente para acessar suas informações.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button variant="destructive" onClick={clearUser} aria-label="Confirmar saída">Sair</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                ) : (
                    <Link to="/register" className="ml-5 md:mr-3">
                        <Button variant="default" className="font-semibold bg-blue-400" aria-label="Entrar">
                            Entrar
                        </Button>
                    </Link>
                )}
                <Link to="/" className="text-2xl font-bold text-blue-400 tracking-tight flex items-center gap-2 md:mb-0 md:mr-8">
                    Nota Brasil
                    <img src={brazilLogo} alt="Logo Brasil" className="w-6 h-6" />
                </Link>
                <button
                    className="md:hidden mb-2 mr-22 mt-2 z-50 transition-transform duration-300 ease-in-out hover:scale-110"
                    aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                    onClick={handleMenuToggle}
                >
                    <div className="relative w-8 h-8">
                        <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-0 rotate-45' : 'opacity-100 rotate-0'}`}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </div>
                        <div className={`absolute inset-0 transition-all duration-300 ease-in-out ${menuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                    </div>
                </button>
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
                    <li>
                        <Link
                            to="/register"
                            className={`hover:text-red-600 transition-all duration-300 ease-in-out ${isActive("/register") ? "bg-blue-100 rounded-md px-2 py-1" : ""}`}
                        >
                            Cadastrar sua conta
                        </Link>
                    </li>
                </ul>
                {menuOpen && (
                    <>
                        <div
                            className={`fixed inset-0 bg-black/40 z-40 md:hidden transition-opacity duration-300 ease-in-out ${
                                isAnimating ? 'opacity-100' : 'opacity-0'
                            }`}
                            onClick={handleOverlayClick}
                        />
                        <ul
                            ref={menuRef}
                            className={`flex flex-col fixed top-16 left-0 w-full bg-white shadow-lg rounded-b z-50 md:hidden p-[5px] transform transition-all duration-300 ease-in-out ${
                                isAnimating 
                                    ? 'opacity-100 translate-y-0 scale-100' 
                                    : 'opacity-0 -translate-y-4 scale-95'
                            }`}
                        >
                            <li className={`transform transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: isAnimating ? '100ms' : '0ms' }}>
                                <Link
                                    to="/"
                                    className={`block px-4 py-3 border-b border-gray-200 hover:text-red-600 hover:bg-gray-50 transition-all duration-300 ease-in-out ${isActive("/") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={handleMenuClose}
                                >
                                    Início
                                </Link>
                            </li>
                            <li className={`transform transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: isAnimating ? '150ms' : '0ms' }}>
                                <Link
                                    to="/nfe-form"
                                    className={`block px-4 py-3 border-b border-gray-200 hover:text-red-600 hover:bg-gray-50 transition-all duration-300 ease-in-out ${isActive("/nfe-form") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={handleMenuClose}
                                >
                                    Gerar Nfe
                                </Link>
                            </li>
                            <li className={`transform transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: isAnimating ? '200ms' : '0ms' }}>
                                <Link
                                    to="/about"
                                    className={`block px-4 py-3 border-b border-gray-200 hover:text-red-600 hover:bg-gray-50 transition-all duration-300 ease-in-out ${isActive("/about") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={handleMenuClose}
                                >
                                    Sobre Nós
                                </Link>
                            </li>
                            <li className={`transform transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: isAnimating ? '250ms' : '0ms' }}>
                                <Link
                                    to="/my-nfe"
                                    className={`block px-4 py-3 border-b hover:text-red-600 hover:bg-gray-50 transition-all duration-300 ease-in-out ${isActive("/my-nfe") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={handleMenuClose}
                                >
                                    Minhas NFEs
                                </Link>
                            </li>
                            <li className={`transform transition-all duration-300 ease-in-out hover:bg-gray-50 ${isAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{ transitionDelay: isAnimating ? '300ms' : '0ms' }}>
                                <Link
                                    to="/register"
                                    className={`block px-4 py-3 hover:text-red-600 hover:bg-gray-50 transition-all duration-300 ease-in-out ${isActive("/register") ? "bg-blue-100 rounded-md" : ""}`}
                                    onClick={handleMenuClose}
                                >
                                    Cadastrar sua conta
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