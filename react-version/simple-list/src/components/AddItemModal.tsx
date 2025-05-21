import React from 'react';
import { Modal, Button, Box, TextField, Typography } from '@mui/material';

type Props = {
    open: boolean;
    onClose: () => void;
};

const AddItemModal = ({ open, onClose }: Props) => {
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
                    className="bg-gray-50" />
                <div className="flex justify-end gap-2">
                    <Button aria-label="Add new item" variant="contained" color="primary">Add</Button>
                    <Button aria-label="Cancel proccess" onClick={onClose} variant="outlined" color="secondary">
                        Cancel
                    </Button>
                </div>

            </Box>
        </Modal >
    );
};

export default AddItemModal;