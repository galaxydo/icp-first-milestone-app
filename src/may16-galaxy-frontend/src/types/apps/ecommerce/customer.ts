export type IEcommerceCustomer = {
    id: number;
    image: string;
    name: string;
    date: Date;
    email: string;
    mobile_number: string;
    verified: boolean;
    spend: number;
    purchases: number;
    gender: "male" | "female";
};
