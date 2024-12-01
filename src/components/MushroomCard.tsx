import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Mushroom } from '../types/mushroom';
import { format } from 'date-fns';

interface MushroomCardProps {
  mushroom: Mushroom;
  onEdit: (mushroom: Mushroom) => void;
  onDelete: (id: number) => void;
}

export default function MushroomCard({ mushroom, onEdit, onDelete }: MushroomCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {mushroom.imageUrl && (
        <img
          src={mushroom.imageUrl}
          alt={mushroom.species}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{mushroom.species}</h3>
            <p className="text-sm text-gray-600">{mushroom.location}</p>
            <p className="text-sm text-gray-500">
              {format(new Date(mushroom.date), 'PPP')}
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(mushroom)}
              className="p-1 text-gray-500 hover:text-indigo-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => mushroom.id && onDelete(mushroom.id)}
              className="p-1 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        {mushroom.notes && (
          <p className="mt-2 text-sm text-gray-600">{mushroom.notes}</p>
        )}
        <div className="mt-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            mushroom.edible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {mushroom.edible ? 'Edible' : 'Not Edible'}
          </span>
        </div>
      </div>
    </div>
  );
}