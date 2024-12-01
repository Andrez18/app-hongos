import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Mushroom } from './types/mushroom';
import { getAllMushrooms, insertMushroom, updateMushroom, deleteMushroom } from './db/database';
import MushroomForm from './components/MushroomForm';
import MushroomCard from './components/MushroomCard';

function App() {
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMushroom, setEditingMushroom] = useState<Mushroom | null>(null);

  useEffect(() => {
    loadMushrooms();
  }, []);

  const loadMushrooms = () => {
    const data = getAllMushrooms();
    setMushrooms(data);
  };

  const handleSubmit = (mushroomData: Omit<Mushroom, 'id'>) => {
    if (editingMushroom?.id) {
      updateMushroom({ ...mushroomData, id: editingMushroom.id });
    } else {
      insertMushroom(mushroomData);
    }
    loadMushrooms();
    setIsFormOpen(false);
    setEditingMushroom(null);
  };

  const handleEdit = (mushroom: Mushroom) => {
    setEditingMushroom(mushroom);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this mushroom?')) {
      deleteMushroom(id);
      loadMushrooms();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mushroom Tracker</h1>
          <button
            onClick={() => setIsFormOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Mushroom
          </button>
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                {editingMushroom ? 'Edit Mushroom' : 'Add New Mushroom'}
              </h2>
              <MushroomForm
                mushroom={editingMushroom || undefined}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingMushroom(null);
                }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mushrooms.map((mushroom) => (
            <MushroomCard
              key={mushroom.id}
              mushroom={mushroom}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;