import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["resources/*/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    daisyui: {
        themes: [
            {
                RicoDark: {
                    primary: "#ffffff",
                    "primary-focus": "#ffffff",
                    "primary-content": "#000000",

                    secondary: "#ffffff",
                    "secondary-focus": "#ffffff",
                    "secondary-content": "#000000",

                    accent: "#ffffff",
                    "accent-focus": "#ffffff",
                    "accent-content": "#000000",

                    neutral: "#333333",
                    "neutral-focus": "#4d4d4d",
                    "neutral-content": "#ffffff",

                    "base-100": "#000000",
                    "base-200": "#111111",
                    "base-300": "#222222",
                    "base-content": "#ffffff",

                    info: "#bab1fb",
                    success: "#b1f6fb",
                    warning: "#e1fbb1",
                    error: "#fbd5b1",

                    "--rounded-box": ".2rem",
                    "--rounded-btn": ".3rem",
                    "--rounded-badge": "1rem",

                    "--animation-btn": ".25s",
                    "--animation-input": ".2s",

                    "--btn-text-case": "uppercase",
                    "--navbar-padding": ".5rem",
                    "--border-btn": "1px",
                },
                RicoBright: {
                    primary: "#808080",
                    "primary-focus": "#737373",
                    "primary-content": "#f2f2f3",

                    secondary: "#4d4d4d",
                    "secondary-focus": "#404040",
                    "secondary-content": "#f2f2f3",

                    accent: "#1a1a1a",
                    "accent-focus": "#0d0d0d",
                    "accent-content": "#f2f2f3",

                    neutral: "#f2f2f3",
                    "neutral-focus": "#e4e4e7",
                    "neutral-content": "#4d4d4d",

                    "base-100": "#ffffff",
                    "base-200": "#ffffff",
                    "base-300": "#ffffff",
                    "base-content": "#7d7d7d",

                    info: "#b4c0fe",
                    success: "#a4eae6",
                    warning: "#d2e99f",
                    error: "#feceb4",

                    "--rounded-box": ".2rem",
                    "--rounded-btn": ".3rem",
                    "--rounded-badge": "1rem",

                    "--animation-btn": ".25s",
                    "--animation-input": ".2s",

                    "--btn-text-case": "uppercase",
                    "--navbar-padding": ".5rem",
                    "--border-btn": "1px",
                },
            },
        ],
    },

    plugins: [daisyui],
};
