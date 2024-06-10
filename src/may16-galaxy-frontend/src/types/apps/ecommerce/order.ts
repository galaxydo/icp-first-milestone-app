import { IEcommerceCustomer } from "./customer";
import { IEcommerceProduct } from "./product";

export type IEcommerceOrder = {
    id: number;
    items_count: number;
    date: Date;
    customer: string;
    payment_status: "paid" | "unpaid";
    status: "ordered" | "accepted" | "delivered" | "on_the_way";
    amount: number;
};

export type IEcommerceFullOrder = {
    id: number;
    items: (IEcommerceProduct & {
        quantity: number;
    })[];
    date: Date;
    customer: IEcommerceCustomer;
    payment: {
        status: "paid" | "unpaid";
        card_number: string;
        expiry_date: Date;
    };
    delivery_partner: IEcommerceCustomer;
    address: {
        address: string;
        city: string;
        country: string;
        pincode: string;
    };
    payment_status: "paid" | "unpaid";
    status: "ordered" | "accepted" | "delivered" | "on_the_way";
    amount: number;
    sub_total: number;
    tax: number;
    discount: number;
    total: number;
};
