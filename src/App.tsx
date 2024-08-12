import "./App.css";
import Banners from "./pages/Banners";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/banners" element={<Banners />} />
            </Routes>
        </BrowserRouter>
    );
}
