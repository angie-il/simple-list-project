import { useState } from 'react';
import "./App.css";
import AddItemModal from './components/AddItemModal';
import ItemList from './components/ItemList';


function App() {
  const fakeItems = ["Buy milk", "Learn TypeScript", "Walk the dog", "Fix the damn bug"];
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My List</h1>
        <ItemList items={fakeItems} />

        <div className="w-full flex justify-between items-center mt-6">
          <div className="flex gap-4">
            <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-semibold">
              Undo
            </button>
            <button className="border border-blue-500 text-blue-500 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-semibold">
              Delete
            </button>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition font-semibold"
          >
            Add
          </button>
        </div>

        <AddItemModal open={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}

export default App;
