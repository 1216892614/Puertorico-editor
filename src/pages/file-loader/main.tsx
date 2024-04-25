import React from "react";
import ReactDOM from "react-dom/client";
import FileLoaderApp from "./FileLoaderApp";
import HeaderBarInner from "./HeaderBarInner";
import "@/styles.css";

ReactDOM.createRoot(document.getElementById("file-loader")!).render(
    <React.StrictMode>
        <FileLoaderApp />
    </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("header-bar")!).render(
    <React.StrictMode>
        <HeaderBarInner />
    </React.StrictMode>
);
