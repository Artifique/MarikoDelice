"use client";

import React from "react";
import { useSiteStore } from "@/store/useSiteStore";
import { 
  ShoppingBag, 
  Image as ImageIcon, 
  MessageSquare, 
  ExternalLink 
} from "lucide-react";
import Link from "next/link";

export default function AdminOverview() {
  const { products, gallery, testimonials, general } = useSiteStore();

  const stats = [
    { 
      label: "Produits", 
      value: products.length, 
      icon: ShoppingBag, 
      color: "text-blue-600", 
      bg: "bg-blue-100",
      href: "/admin/produits"
    },
    { 
      label: "Images Galerie", 
      value: gallery.length, 
      icon: ImageIcon, 
      color: "text-purple-600", 
      bg: "bg-purple-100",
      href: "/admin/galerie"
    },
    { 
      label: "Témoignages", 
      value: testimonials.length, 
      icon: MessageSquare, 
      color: "text-green-600", 
      bg: "bg-green-100",
      href: "/admin/temoignages"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Bienvenue sur votre Dashboard</h2>
        <p className="text-gray-500">Gérez le contenu de {general.name} en toute simplicité.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link 
            key={stat.label} 
            href={stat.href}
            className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Aperçu Rapide</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Nom du site</span>
              <span className="text-sm font-medium">{general.name}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">E-mail contact</span>
              <span className="text-sm font-medium">{general.contact.email}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-600">Statut du site</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                En ligne
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Actions Rapides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/" 
              target="_blank"
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Voir le site
            </Link>
            <Link 
              href="/admin/general"
              className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Modifier les infos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
