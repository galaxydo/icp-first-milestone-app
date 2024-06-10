import product1Img from "@/assets/images/apps/ecommerce/products/1.jpg";
import product2Img from "@/assets/images/apps/ecommerce/products/2.jpg";
import product3Img from "@/assets/images/apps/ecommerce/products/3.jpg";
import avatar8Img from "@/assets/images/avatars/8.png";
import avatar9Img from "@/assets/images/avatars/9.png";

import DateUtil from "@/helpers/utils/date";
import { IEcommerceFullOrder, IEcommerceOrder } from "@/types/apps/ecommerce";

export const getEcommerceOrderData: IEcommerceOrder[] = [
    {
        id: 21001,
        amount: 342,
        customer: "Emily Johnson",
        status: "ordered",
        items_count: 5,
        payment_status: "paid",
        date: DateUtil.minusMonths(1),
    },

    {
        id: 21002,
        amount: 578,
        customer: "Alex Thompson",
        status: "accepted",
        items_count: 3,
        payment_status: "paid",
        date: DateUtil.minusMonths(9),
    },

    {
        id: 21003,
        amount: 215,
        customer: "Sarah Davis",
        status: "on_the_way",
        items_count: 6,
        payment_status: "unpaid",
        date: DateUtil.minusMonths(5),
    },

    {
        id: 21004,
        amount: 769,
        customer: "Michael Wilson",
        status: "delivered",
        items_count: 2,
        payment_status: "unpaid",
        date: DateUtil.minusMonths(11),
    },

    {
        id: 21005,
        amount: 431,
        customer: "Jessica Miller",
        status: "accepted",
        items_count: 7,
        payment_status: "paid",
        date: DateUtil.minusMonths(2),
    },

    {
        id: 21006,
        amount: 622,
        customer: "Brian Anderson",
        status: "ordered",
        items_count: 1,
        payment_status: "paid",
        date: DateUtil.minusMonths(7),
    },

    {
        id: 21007,
        amount: 894,
        customer: "Olivia Smith",
        status: "on_the_way",
        items_count: 4,
        payment_status: "unpaid",
        date: DateUtil.minusMonths(3),
    },

    {
        id: 21008,
        amount: 156,
        customer: "Daniel Robinson",
        status: "delivered",
        items_count: 7,
        payment_status: "paid",
        date: DateUtil.minusMonths(8),
    },
    {
        id: 21009,
        amount: 497,
        customer: "Emma Garcia",
        status: "ordered",
        items_count: 1,
        payment_status: "unpaid",
        date: DateUtil.minusMonths(0),
    },
    {
        id: 21010,
        amount: 783,
        customer: "Christopher Baker",
        status: "accepted",
        items_count: 3,
        payment_status: "paid",
        date: DateUtil.minusMonths(6),
    },
];

export const getEcommerceFullOrderData: IEcommerceFullOrder = {
    id: 1002,
    date: new Date(),
    amount: 125,
    status: "ordered",
    payment_status: "paid",
    items: [
        {
            id: 1001,
            name: "Men's tracking shoes",
            image: product1Img,
            date: DateUtil.minusDays(1),
            category: "Fashion",
            price: 29,
            stock: 43,
            orders: 10,
            ratings: 4.7,
            ratings_count: 130,
            sku: "SHOES",
            quantity: 3,
        },
        {
            id: 1002,
            name: "Cocooil body oil",
            image: product2Img,
            date: DateUtil.minusDays(4),
            category: "Daily Need",
            price: 16,
            stock: 35,
            orders: 15,
            ratings: 4.2,
            ratings_count: 547,
            sku: "COCOOIL",
            quantity: 2,
        },
        {
            id: 1003,
            name: "Freeze air ",
            image: product3Img,
            date: DateUtil.minusDays(9),
            category: "Cosmetic",
            price: 32,
            stock: 43,
            orders: 25,
            ratings: 3.8,
            ratings_count: 862,
            sku: "FREEAIR",
            quantity: 4,
        },
    ],
    customer: {
        id: 9,
        name: "James J. Herron",
        image: avatar9Img,
        email: "james@mail.com",
        gender: "male",
        purchases: 54,
        spend: 1080,
        date: DateUtil.minusMonths(9),
        verified: true,
        mobile_number: "262-726-6322",
    },
    payment: {
        status: "unpaid",
        expiry_date: DateUtil.addMonths(8),
        card_number: "2487",
    },
    delivery_partner: {
        id: 8,
        name: "Patricia T. Gandy",
        image: avatar8Img,
        email: "pat.gandy@mail.com",
        gender: "female",
        purchases: 78,
        spend: 1547,
        date: DateUtil.minusMonths(5),
        verified: true,
        mobile_number: "707-237-9941",
    },
    address: {
        address: "4239 Bloomfield Way",
        city: "Standish",
        country: "ME",
        pincode: "047842",
    },
    sub_total: 247,
    tax: 44,
    discount: 60,
    total: 231,
};
