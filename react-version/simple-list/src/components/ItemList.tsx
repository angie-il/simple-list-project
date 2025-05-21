import React from 'react';

type Props = {
    items: string[];
};

const ItemList = ({ items }: Props) => {
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
                                className="bg-gray-100 hover:bg-indigo-100 p-3 rounded-md text-center text-gray-700 font-semibold shadow-sm"
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