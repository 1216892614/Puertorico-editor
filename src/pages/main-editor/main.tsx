import React from "react";
import ReactDOM from "react-dom/client";
import MainEditorApp from "./MainEditorApp";
import HeaderBarInner from "@/components/Header";
import "@/styles.css";

ReactDOM.createRoot(document.getElementById("main-editor")!).render(
    <React.StrictMode>
        <MainEditorApp />
    </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("header-bar")!).render(
    <React.StrictMode>
        <HeaderBarInner />
    </React.StrictMode>
);
