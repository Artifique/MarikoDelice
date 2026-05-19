"use client";

import React, { useState } from "react";
import { useSiteStore } from "@/store/useSiteStore";
import { Save, CheckCircle2 } from "lucide-react";

export default function GeneralSettings() {
  const { general, setGeneral } = useSiteStore();
  const [formData, setFormData] = useState(general);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneral(formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Paramètres Généraux</h2>
          <p className="text-gray-500">Gérez les informations de base de votre établissement.</p>
        </div>
        {showSuccess && (
          <div className="flex items-center text-green-600 bg-green-50 px-4 py-2 rounded-lg animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Modifications enregistrées !</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identité */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Identité du site</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nom de l'établissement</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Slogan</label>
              <input
                type="text"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Coordonnées</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Téléphone</label>
              <input
                type="text"
                name="contact.phone"
                value={formData.contact.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-mail</label>
              <input
                type="email"
                name="contact.email"
                value={formData.contact.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Adresse</label>
              <input
                type="text"
                name="contact.address"
                value={formData.contact.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Horaires d'ouverture</label>
              <textarea
                name="contact.hours"
                value={formData.contact.hours}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Réseaux Sociaux */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Réseaux Sociaux (identifiants)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Instagram</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">@</span>
                <input
                  type="text"
                  name="socials.instagram"
                  value={formData.socials.instagram}
                  onChange={handleChange}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Facebook</label>
              <input
                type="text"
                name="socials.facebook"
                value={formData.socials.facebook}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">WhatsApp (numéro)</label>
              <input
                type="text"
                name="socials.whatsapp"
                value={formData.socials.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
