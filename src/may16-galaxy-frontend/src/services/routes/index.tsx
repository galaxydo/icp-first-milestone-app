const routes = {
    landing: "/landing",
    home: "/dashboards/ecommerce",
    docs: "/docs/introduction",
    auth: {
        login: "/auth/login",
        register: "/auth/register",
        forgotPassword: "/auth/forgot-password",
        resetPassword: "/auth/reset-password",
    },
    dashboards: {
        ecommerce: "/dashboards/ecommerce",
    },
    apps: {
        ecommerce: {
            orders: {
                index: "/apps/ecommerce/orders",
                show: (id: number | string) => `/apps/ecommerce/orders/${id}`,
            },
            products: {
                index: "/apps/ecommerce/products",
            },
            customers: {
                index: "/apps/ecommerce/customers",
            },
            sellers: {
                index: "/apps/ecommerce/sellers",
            },
            shops: {
                index: "/apps/ecommerce/shops",
            },
        },
        fileManager: {
            home: "/apps/file-manager",
        },
        chat: {
            home: "/apps/chat",
        },
    },
    ui: {
        components: {
            accordion: "/ui/components/accordion",
            alert: "/ui/components/alert",
            avatar: "/ui/components/avatar",
            badge: "/ui/components/badge",
            breadcrumb: "/ui/components/breadcrumb",
            button: "/ui/components/button",
            countdown: "/ui/components/countdown",
            drawer: "/ui/components/drawer",
            dropdown: "/ui/components/dropdown",
            loading: "/ui/components/loading",
            menu: "/ui/components/menu",
            modal: "/ui/components/modal",
            pagination: "/ui/components/pagination",
            progress: "/ui/components/progress",
            step: "/ui/components/step",
            tab: "/ui/components/tab",
            timeline: "/ui/components/timeline",
            toast: "/ui/components/toast",
            tooltip: "/ui/components/tooltip",
        },
        forms: {
            checkbox: "/ui/forms/checkbox",
            file: "/ui/forms/file",
            input: "/ui/forms/input",
            radio: "/ui/forms/radio",
            range: "/ui/forms/range",
            rating: "/ui/forms/rating",
            toggle: "/ui/forms/toggle",
        },
    },
    pages: {},
    externalLinks: {
        discord: "https://discord.com/invite/S6TZxycVHs",
        purchase: "https://daisyui.com/store/",
        daisyui: "https://daisyui.com",
    },
};

export default routes;
