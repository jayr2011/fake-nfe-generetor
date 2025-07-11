import { Route, Routes } from "react-router";
import NfePage from "./pages/nfeHomePage/NfePage";
import NfeFormPage from "./pages/nfeFormPage/NfeFormPage";
import NavBar from "./components/navbar/NavBar";
import { Footer } from "./components/Footer/Footer";

export default function AppRoutes() {
  return (
    <div>
    <NavBar />
    <Routes>
        <Route path="/" element={<NfePage />} />
        <Route path="/nfe-form" element={<NfeFormPage />} />
    </Routes>
    <Footer />
    </div>
  );
}