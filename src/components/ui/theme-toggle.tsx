import { useTheme } from "next-themes";
import { Button } from "./button";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            {theme === "light" ? <Moon /> : <Sun />}
        </Button>
    )
}