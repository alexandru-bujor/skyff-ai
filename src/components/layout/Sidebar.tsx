import { Link, NavLink } from "react-router-dom";
import { Sparkles, Sun, Moon, Languages, Search, Users, History, HelpCircle } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { useI18n, type Lang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export function Sidebar() {
  const { theme, toggle } = useTheme();
  const { t, lang, setLang } = useI18n();
  const { user, logout, isAuthenticated } = useAuth();

  const langs: { code: Lang; label: string }[] = [
    { code: "ro", label: "Română" },
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" },
  ];

  const navLinks = [
    { to: "/", label: t("nav.explore"), icon: Search, exact: true },
    { to: "/results", label: t("nav.providers"), icon: Users },
    { to: "/history", label: "Istoric", icon: History },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-50 hidden w-[220px] flex-col gap-2 border-r border-border/50 bg-background/60 px-3 py-5 backdrop-blur-xl md:flex">
      {/* Logo */}
      <Link to="/" className="group mb-4 flex items-center gap-2.5 rounded-xl px-2 py-1.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-accent shadow-glow transition-spring group-hover:scale-110">
          <Sparkles className="h-5 w-5 text-accent-foreground" />
        </div>
        <span className="text-lg font-semibold tracking-tight">
          Skyff<span className="text-accent">.io</span>
        </span>
      </Link>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1">
        {navLinks.map(({ to, label, icon: Icon, exact }) => (
          <NavLink
            key={to}
            to={to}
            end={exact}
            className={({ isActive }) => 
              `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-smooth ${
                isActive 
                  ? "bg-secondary text-foreground" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Footer controls */}
      <div className="flex flex-col gap-2 border-t border-border/50 pt-4">
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Language">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right" className="min-w-[140px]">
              {langs.map((l) => (
                <DropdownMenuItem
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={lang === l.code ? "font-semibold text-accent" : ""}
                >
                  {l.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon-sm" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Help & Resources">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="right" className="min-w-[180px]">
              <DropdownMenuItem asChild>
                <Link to="/help">Help Center</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/releases">Release Notes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/terms">Terms of Service</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/privacy">Privacy Policy</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isAuthenticated && user ? (
          <div className="mt-2 flex items-center gap-3 rounded-2xl bg-secondary/50 p-2 ring-1 ring-border/50">
            <Avatar className="h-9 w-9 border-2 border-background shadow-soft">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>
                <UserIcon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col min-w-0">
              <span className="truncate text-sm font-semibold">{user.name}</span>
              <span className="truncate text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Client</span>
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={logout}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-smooth hover:bg-secondary hover:text-foreground"
            >
              {t("nav.signin")}
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground shadow-glow transition-spring hover:scale-[1.02] active:scale-[0.98]"
            >
              {t("nav.signup")}
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}