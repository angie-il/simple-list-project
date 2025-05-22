import React from 'react';

type Props = {
    items: string[];
    selectedIndex: number | null;
    onSelect: (index: number) => void;
    onDelete: (index: number) => void;
};

const ItemList = ({ items, selectedIndex, onSelect, onDelete }: Props) => {
    const handleDoubleClickDelete = (item: string, index: number) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${item}"?`);
        if (confirmDelete) {
            onDelete(index);
        }
    };

    return (
        <div className="w-full">
            <div className="border border-gray-300 rounded-xl p-4 min-h-[150px] bg-white shadow-sm">
                <ul className="space-y-3">
                    {items.length === 0 ? (
                        <li className="text-gray-400 italic text-center">No items yet...</li>
                    ) : (
                        items.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => onSelect(index)}
                                onDoubleClick={() => handleDoubleClickDelete(item, index)}
                                aria-label={`Select item ${item}`}
                                className={`p-3 rounded-md text-center font-semibold shadow-sm cursor-pointer transition
                                    ${index === selectedIndex
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-indigo-100'}`}
                            >
                                {item}
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default ItemList;