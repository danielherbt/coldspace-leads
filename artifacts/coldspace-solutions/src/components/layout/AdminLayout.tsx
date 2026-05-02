import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, MessageSquare, Edit3, LogOut, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";

// Very basic client-side protection for the demo/CMS
const ADMIN_PASSWORD = "admin"; // Should be moved to env for real production, but suffices for a simple CMS if not specified

export function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Contraseña incorrecta / Incorrect password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    setLocation("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="flex bg-slate-50 items-center justify-center min-h-screen p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-100">
          <div className="flex justify-center mb-6">
            <Lock className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Contraseña / Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-primary">
              Volver al sitio web / Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/content", label: "Contenido", icon: Edit3 },
    { href: "/admin/contacts", label: "Contactos", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-200">
          <Link href="/admin">
            <span className="text-2xl font-bold text-primary font-orbitron cursor-pointer">
              ColdSpace<span className="text-secondary">Admin</span>
            </span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <span
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-red-500 hover:bg-red-50 w-full rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 p-4 md:hidden flex justify-between items-center">
          <span className="text-xl font-bold text-primary font-orbitron">
            ColdSpace<span className="text-secondary">Admin</span>
          </span>
          <button onClick={handleLogout} className="text-slate-500">
            <LogOut className="w-6 h-6" />
          </button>
        </header>
        <div className="p-6 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
