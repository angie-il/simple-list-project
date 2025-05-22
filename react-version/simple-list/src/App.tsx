import { useState, useEffect } from 'react';
import "./App.css";
import AddItemModal from './components/AddItemModal';
import ItemList from './components/ItemList';


function App() {
  const [items, setItems] = useState<string[]>(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [deletedItem, setDeletedItem] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const handleAddItem = (newItem: string) => {
    setItems((prevItems: string[]) => [...prevItems, newItem]);
  };

  const handleDeleteItem = () => {
    if (selectedIndex === null) return;
    const deletedItem = items[selectedIndex];
    setItems((prevItems: string[]) => prevItems.filter((_, i) => i !== selectedIndex));
    setSelectedIndex(null);
    setDeletedItem(deletedItem);
  };

  const handleUndoDelete = () => {
    if (!deletedItem) return;
    setItems((prevItems: string[]) => [...prevItems, deletedItem]);
    setDeletedItem(null);
  };

  const handleDirectDelete = (index: number) => {
    const deleted = items[index];
    setItems((prevItems: string[]) => prevItems.filter((_, i) => i !== selectedIndex));
    setSelectedIndex(null);
    setDeletedItem(deleted);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="font-bold text-center text-gray-800 mb-6">Simple List</h1>
        <p className="text-gray-800 mb-6 text-center">This is your list you can go on adding everything you need to</p>

        <ItemList
          items={items}
          selectedIndex={selectedIndex}
          onSelect={(index) => setSelectedIndex(index)}
          onDelete={(index) => {
            handleDirectDelete(index);
          }}
        />

        <div className="w-full flex justify-between items-center mt-6">
          <div className="flex gap-4">
            <button className={`border border-blue-500 text-blue-500 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-semibold 
    ${!deletedItem ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleUndoDelete} disabled={!deletedItem}>
              Undo
            </button>
            <button onClick={handleDeleteItem} className="border border-blue-500 text-blue-500 px-5 py-2 rounded-lg hover:bg-blue-50 transition font-semibold">
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

        <AddItemModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onAddItem={handleAddItem}
        />
      </div>
    </div>
  );
}

export default App;
