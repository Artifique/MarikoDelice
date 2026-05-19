"use client";

import React, { useState } from "react";
import { useSiteStore } from "@/store/useSiteStore";
import { Plus, Trash2, X, Save } from "lucide-react";
import { GalleryImage } from "@/types";

export default function GalerieAdmin() {
  const { gallery, addGalleryImage, deleteGalleryImage } = useSiteStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ url: "", category: "Produits" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryImage({
      id: Math.random().toString(36).substr(2, 9),
      url: formData.url,
      category: formData.category,
      order: gallery.length,
    });
    setFormData({ url: "", category: "Produits" });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion de la Galerie</h2>
          <p className="text-gray-500">Gérez les photos affichées dans la section galerie.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ajouter une Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((image) => (
          <div key={image.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
            <img 
              src={image.url} 
              alt={image.category} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
              <span className="text-white text-xs font-medium px-2 py-1 bg-white/20 backdrop-blur-md rounded-full mb-2">
                {image.category}
              </span>
              <button 
                onClick={() => deleteGalleryImage(image.id)}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">Ajouter une image</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">URL de l'image</label>
                <input
                  type="text"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Catégorie</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                >
                  <option value="Produits">Produits</option>
                  <option value="Boutique">Boutique</option>
                  <option value="Atelier">Atelier</option>
                  <option value="Événements">Événements</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
