"use client";

import React, { useState } from "react";
import { useSiteStore } from "@/store/useSiteStore";
import { Save, CheckCircle2, Image as ImageIcon, Video } from "lucide-react";

export default function HeroSettings() {
  const { hero, setHero } = useSiteStore();
  const [formData, setFormData] = useState(hero);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHero(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres du Hero</h2>
          <p className="text-gray-500">Configurez la première section visible de votre site.</p>
        </div>
        {showSuccess && (
          <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Modifications enregistrées !</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Titre principal</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Sous-titre</label>
            <textarea
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Texte du bouton (CTA)</label>
              <input
                type="text"
                name="ctaText"
                value={formData.ctaText}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type de média</label>
              <select
                name="mediaType"
                value={formData.mediaType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="image">Image</option>
                <option value="video">Vidéo</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">URL du média (Image ou Vidéo)</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
              <div className="w-12 h-10 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                {formData.mediaType === "image" ? <ImageIcon className="h-5 w-5 text-gray-400" /> : <Video className="h-5 w-5 text-gray-400" />}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Badge Flottant</h3>
          <div className="flex items-center gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="showBadge"
                checked={formData.showBadge}
                onChange={(e) => setFormData(prev => ({ ...prev, showBadge: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary relative"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">Afficher le badge</span>
            </label>
            
            <div className="flex-1 space-y-2">
              <input
                type="text"
                name="badgeText"
                value={formData.badgeText}
                onChange={handleChange}
                disabled={!formData.showBadge}
                placeholder="Texte du badge..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center px-6 py-3 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            <Save className="h-5 w-5 mr-2" />
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
}
