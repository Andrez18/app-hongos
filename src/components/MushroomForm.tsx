import React, { useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import type { Mushroom } from '../types/mushroom';

interface MushroomFormProps {
  mushroom?: Mushroom;
  onSubmit: (mushroom: Omit<Mushroom, 'id'>) => void;
  onCancel?: () => void;
}

export default function MushroomForm({ mushroom, onSubmit, onCancel }: MushroomFormProps) {
  const [formData, setFormData] = useState<Omit<Mushroom, 'id'>>({
    species: mushroom?.species || '',
    location: mushroom?.location || '',
    date: mushroom?.date || new Date().toISOString().split('T')[0],
    notes: mushroom?.notes || '',
    edible: mushroom?.edible || false,
    imageUrl: mushroom?.imageUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Species</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.species}
          onChange={(e) => setFormData({ ...formData, species: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Date Found</label>
        <input
          type="date"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          checked={formData.edible}
          onChange={(e) => setFormData({ ...formData, edible: e.target.checked })}
        />
        <label className="ml-2 block text-sm text-gray-900">Edible</label>
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
        >
          {mushroom ? <Save className="w-4 h-4 mr-2" /> : <PlusCircle className="w-4 h-4 mr-2" />}
          {mushroom ? 'Save Changes' : 'Add Mushroom'}
        </button>
      </div>
    </form>
  );
}