import { useState } from 'react';
import { Modal, Button, Box, TextField, Typography } from '@mui/material';

type Props = {
    open: boolean;
    onClose: () => void;
    onAddItem: (item: string) => void;
};

const AddItemModal = ({ open, onClose, onAddItem }: Props) => {
    const [inputValue, setInputValue] = useState<string>("");

    const handleAddItem = () => {
        if (!inputValue.trim()) return;
        onAddItem(inputValue.trim());
        setInputValue("");
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="add-item-title"
            aria-describedby="add-item-description">
            <Box
                className="absolute top-1/2 left-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 
                  bg-white p-6 rounded-xl shadow-lg flex flex-col gap-4 animate-drop-in"
            >
                <Typography id="add-item-title"
                    variant="h6" component="h2" className="text-center font-bold text-gray-800">
                    Add item to list
                </Typography>
                <TextField
                    label="Item name"
                    variant="outlined"
                    fullWidth
                    className="bg-gray-50"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddItem();
                        }
                    }
                    }
                />
                < div className="flex justify-end gap-2" >
                    <Button
                        aria-label="Add new item"
                        variant="contained"
                        color="primary"
                        onClick={handleAddItem}
                    >Add</Button>
                    <Button aria-label="Cancel proccess" onClick={onClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal >
    );
};

export default AddItemModal;