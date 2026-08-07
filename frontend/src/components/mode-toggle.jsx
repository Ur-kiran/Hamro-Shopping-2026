import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="
            relative flex items-center justify-center
            w-9 h-9 rounded-md
            bg-gray-100 dark:bg-gray-800
            hover:bg-gray-200 dark:hover:bg-gray-700
            text-gray-700 dark:text-gray-200
            transition-all duration-200
          "
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="
          bg-white dark:bg-[#17181c]
          border border-gray-200 dark:border-gray-800
          text-gray-700 dark:text-gray-200
        "
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="cursor-pointer"
        >
          Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="cursor-pointer"
        >
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}