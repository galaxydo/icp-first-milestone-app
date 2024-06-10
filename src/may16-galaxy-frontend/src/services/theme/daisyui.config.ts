import theme from "daisyui/src/theming/themes";

const getDaisyUIConfig = () => {
    return {
        themes: [
            {
                light: {
                    ...theme.light,
                    primary: "#3e5eff",
                    "primary-content": "#ffffff",
                    secondary: "#494949",
                    // neutral: "#e1e6ec",
                    // "neutral-content": "#1e2328",

                    info: "#00a6ff",
                    "info-content": "#ffffff",
                    success: "#28a745",
                    "success-content": "#ffffff",
                    warning: "#f5a524",
                    error: "#f3124e",
                    "error-content": "#ffffff",

                    "base-100": "#ffffff",
                    "base-200": "#e6e9ec",
                    "base-300": "#dfe2e6",
                    "base-content": "#1e2328",

                    "--rounded-box": "0.25rem",
                    "--rounded-btn": "0.25rem",
                    "--padding-card": "20px",
                    "--content-background": "#f2f5f8",
                    "--leftmenu-background": "#ffffff",
                },
                dark: {
                    ...theme.dark,
                    primary: "#167bff",
                    "primary-content": "#ffffff",
                    secondary: "#494949",
                    // neutral: "#282d32",
                    info: "#00e1ff",
                    success: "#17c964",
                    "success-content": "#ffffff",
                    warning: "#f5a524",
                    error: "#f31260",
                    "error-content": "#ffffff",

                    "base-100": "#191e23",
                    "base-200": "#252b32",
                    "base-300": "#2a3038",

                    "base-content": "#dcebfa",
                    "--rounded-box": "0.25rem",
                    "--rounded-btn": "0.25rem",

                    "--content-background": "#14181c",
                    "--leftmenu-background": "#1e2328",
                },
            },
        ],
    };
};

export default getDaisyUIConfig;
