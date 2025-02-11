import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomeRoute from "./routes/Home.routes.jsx";
import AssetsRoute from "./routes/Assets.routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/assets" element={<AssetsRoute />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
