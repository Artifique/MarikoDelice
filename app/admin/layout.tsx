"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Image as ImageIcon, 
  MessageSquare, 
  Palette, 
  Settings, 
  Sparkles,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Vue d'ensemble", href: "/admin", icon: LayoutDashboard },
  { name: "Général", href: "/admin/general", icon: Settings },
  { name: "Hero", href: "/admin/hero", icon: Sparkles },
  { name: "Produits", href: "/admin/produits", icon: ShoppingBag },
  { name: "Galerie", href: "/admin/galerie", icon: ImageIcon },
  { name: "Témoignages", href: "/admin/temoignages", icon: MessageSquare },
  { name: "Apparence", href: "/admin/apparence", icon: Palette },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    } else {
      const password = prompt("Entrez le mot de passe administrateur :");
      if (password === "admin123") {
        localStorage.setItem("admin_auth", "true");
        setIsAuthenticated(true);
      } else {
        alert("Mot de passe incorrect");
        window.location.href = "/";
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    window.location.href = "/";
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-gray-900">Mariko Admin</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Gestion du site</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-gray-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Mariko Admin</h1>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
