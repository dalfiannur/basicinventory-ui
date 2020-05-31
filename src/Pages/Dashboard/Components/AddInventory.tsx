import React from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {AddInventoryProps} from "../interfaces";

const AddInventory = (props: AddInventoryProps) => {

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle title={'Add New Item'}>Add New Item</DialogTitle>
            <DialogContent>
                <FormControl>
                    <FormLabel>Product</FormLabel>
                    <Select label={'Product'}>
                        <MenuItem>A</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
        </Dialog>
    )
}

export default AddInventory;