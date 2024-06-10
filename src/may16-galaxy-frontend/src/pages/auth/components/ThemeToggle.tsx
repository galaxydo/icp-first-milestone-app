import ThemeToggleButton from "@/components/ThemeToggleButton";

const ThemeToggle = () => {
    return (
        <ThemeToggleButton
            color="ghost"
            shape={"circle"}
            className={"border border-base-content/10 text-base-content/70 hover:bg-base-content/10"}
        />
    );
};

export default ThemeToggle;
