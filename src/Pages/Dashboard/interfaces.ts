// interfaces.ts
// 
// Author       Dikry Alfiannur Wahyu
// Email        dalfiannur@gmail.com
// Github       https://github.com/dalfiannur
// Created At   5/29/20

import {RouteComponentProps} from "react-router-dom";

export interface DashboardProps extends RouteComponentProps {

}

export interface AddInventoryProps {
    open: boolean;
    onClose: () => void;
    products: IProduct[]
}

export interface IProduct {
    id: number;
    name: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
}

export interface IInventory {
    id: number;
    productId: number;
    quantity: number;
    product: IProduct;
    isOut: boolean;
    createdAt: string
}

export interface IInventoriesResponse {
    message: string;
    data: {
        total: number,
        pages: number,
        inventories: IInventory[]
    }
}