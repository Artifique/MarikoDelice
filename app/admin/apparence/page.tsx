"use client";

import React, { useState } from "react";
import { useSiteStore } from "@/store/useSiteStore";
import { Save, CheckCircle2, RefreshCw } from "lucide-react";

export default function ApparenceAdmin() {
  const { appearance, setAppearance } = useSiteStore();
  const [formData, setFormData] = useState(appearance);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppearance(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Apparence & Style</h2>
          <p className="text-gray-500">Personnalisez l'identité visuelle de votre site.</p>
        </div>
        {showSuccess && (
          <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Style mis à jour !</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Couleurs */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Palette de Couleurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Couleur Primaire</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                />
                <input
                  type="text"
                  name="primaryColor"
                  value={formData.primaryColor}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono uppercase"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Couleur Secondaire</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                />
                <input
                  type="text"
                  name="secondaryColor"
                  value={formData.secondaryColor}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono uppercase"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Couleur de Fond</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  name="backgroundColor"
                  value={formData.backgroundColor}
                  onChange={handleChange}
                  className="w-10 h-10 rounded-lg cursor-pointer border-none p-0 overflow-hidden"
                />
                <input
                  type="text"
                  name="backgroundColor"
                  value={formData.backgroundColor}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border rounded-lg text-sm font-mono uppercase"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Polices */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Typographie</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Police des titres</label>
              <select
                name="fontTitle"
                value={formData.fontTitle}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="Playfair Display">Playfair Display (Élégant)</option>
                <option value="Montserrat">Montserrat (Moderne)</option>
                <option value="Cormorant Garamond">Cormorant Garamond (Classique)</option>
                <option value="Lora">Lora (Sérif doux)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Police du corps</label>
              <select
                name="fontBody"
                value={formData.fontBody}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              >
                <option value="DM Sans">DM Sans (Minimaliste)</option>
                <option value="Inter">Inter (Universel)</option>
                <option value="Open Sans">Open Sans (Lisible)</option>
                <option value="Roboto">Roboto (Standard)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Prévisualisation */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Aperçu en direct (Simulation)</h3>
          <div 
            className="p-8 rounded-lg border border-dashed border-gray-300 transition-colors"
            style={{ backgroundColor: formData.backgroundColor }}
          >
            <h4 
              className="text-3xl font-bold mb-4"
              style={{ color: formData.primaryColor, fontFamily: formData.fontTitle }}
            >
              Voici un Titre de Exemple
            </h4>
            <p 
              className="text-lg mb-6 max-w-md"
              style={{ color: "#374151", fontFamily: formData.fontBody }}
            >
              Le texte du corps s'affichera ainsi. Un mélange parfait de lisibilité et de style pour vos clients gourmands.
            </p>
            <button 
              type="button"
              className="px-6 py-2 rounded-full font-bold text-white transition-opacity"
              style={{ backgroundColor: formData.primaryColor }}
            >
              Bouton Primaire
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            <Save className="h-5 w-5 mr-2" />
            Appliquer le style
          </button>
        </div>
      </form>
    </div>
  );
}
