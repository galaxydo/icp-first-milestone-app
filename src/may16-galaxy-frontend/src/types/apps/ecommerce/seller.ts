export type IEcommerceSeller = {
    id: number;
    image: string;
    name: string;
    date: Date;
    shop_name: string;
    email: string;
    mobile_number: string;
    verified: boolean;
    earning: number;
    sales: number;
    gender: "male" | "female";
};
