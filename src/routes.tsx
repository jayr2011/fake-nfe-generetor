import { Route, Routes } from "react-router";
import NfePage from "./pages/nfeHomePage/NfePage";
import NfeFormPage from "./pages/nfeFormPage/NfeFormPage";
import NavBar from "./components/navbar/NavBar";
import AboutComponent from "./pages/aboutUs/AboutComponent";
import MyNfe from "./pages/myNfe/MyNfe";
import RegisterPage from "./pages/register/RegisterPage";
import RegisterFormPage from "./pages/register/RegisterFormPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { Footer } from "./components/Footer/Footer";

export default function AppRoutes() {
  return (
    <div>
    <NavBar />
    <Routes>
        <Route path="/" element={<NfePage />} />
        <Route path="/nfe-form" element={<NfeFormPage />} />
        <Route path="/about" element={<AboutComponent />} />
        <Route path="/my-nfe" element={<MyNfe />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-form" element={<RegisterFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <Footer />
    </div>
  );
}