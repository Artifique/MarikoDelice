"use client";

import React, { useState } from "react";
import { useSiteStore } from "@/store/useSiteStore";
import { Plus, Trash2, Edit2, X, Save, Star } from "lucide-react";
import { Testimonial } from "@/types";

export default function TemoignagesAdmin() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useSiteStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const initialTestimonialState: Omit<Testimonial, "id"> = {
    name: "",
    text: "",
    rating: 5,
    photo: "",
  };

  const [formData, setFormData] = useState(initialTestimonialState);

  const handleOpenAdd = () => {
    setEditingTestimonial(null);
    setFormData(initialTestimonialState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData(testimonial);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, formData);
    } else {
      addTestimonial({
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Testimonial);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Témoignages</h2>
          <p className="text-gray-500">Gérez les avis clients affichés sur votre site.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nouveau Témoignage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm relative group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden mr-4 border border-gray-200">
                  {testimonial.photo ? (
                    <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3 w-3 ${i < testimonial.rating ? "fill-current" : "text-gray-300"}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleOpenEdit(testimonial)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm italic">"{testimonial.text}"</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">{editingTestimonial ? "Modifier le témoignage" : "Ajouter un témoignage"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Nom du client</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Note (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">URL de la photo (optionnel)</label>
                <input
                  type="text"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
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
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
