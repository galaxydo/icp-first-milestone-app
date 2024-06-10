import avatar2Img from "@/assets/images/avatars/2.png";
import avatar3Img from "@/assets/images/avatars/3.png";
import avatar4Img from "@/assets/images/avatars/4.png";
import avatar5Img from "@/assets/images/avatars/5.png";
import avatar6Img from "@/assets/images/avatars/6.png";
import avatar7Img from "@/assets/images/avatars/7.png";
import avatar8Img from "@/assets/images/avatars/8.png";

import DateUtil from "@/helpers/utils/date";
import { IChat } from "@/types/apps/chat";

export const chatData: IChat[] = [
    {
        id: 1,
        image: avatar2Img,
        name: "Debra C. Glen",
        unreads: 2,
        messages: [
            {
                message: "Conversation Started",
                send_at: DateUtil.minusMinutes(200),
                from_me: false,
            },
            {
                message: "Hey, how's it going?",
                send_at: DateUtil.minusMinutes(140),
                from_me: false,
            },
            {
                message: "I'm doing well, thanks! How about you?",
                send_at: DateUtil.minusMinutes(100),
                from_me: true,
            },
            {
                message: "Just finished a great book. Have any recommendations?",
                send_at: DateUtil.minusMinutes(54),
                from_me: false,
            },
            {
                message: "That's awesome! I'd recommend 'The Silent Observer.'",
                send_at: DateUtil.minusMinutes(40),
                from_me: true,
            },
            {
                message: "Thanks! I'll check it out.",
                send_at: DateUtil.minusMinutes(35),
                from_me: false,
            },
            {
                message: "Did you catch the latest movie? It's fantastic!",
                send_at: DateUtil.minusMinutes(25),
                from_me: true,
            },
            {
                message: "No, I haven't. What's the title?",
                send_at: DateUtil.minusMinutes(15),
                from_me: false,
            },
            {
                message: "It's called 'Dreamscape.' A must-watch!",
                send_at: DateUtil.minusMinutes(5),
                from_me: true,
            },
            {
                message: "Sounds intriguing. I'll add it to my watchlist.",
                send_at: DateUtil.minusMinutes(2),
                from_me: false,
            },
            {
                message: "Great! Let me know what you think after watching.",
                send_at: DateUtil.minusMinutes(0),
                from_me: true,
            },
        ],
    },
    {
        id: 2,

        image: avatar3Img,
        name: "Gary N. Roache",
        messages: [
            {
                message: "I just finished a great workout!",
                send_at: DateUtil.minusMinutes(140),
                from_me: false,
            },
            {
                message: "Has anyone seen my keys?",
                send_at: DateUtil.minusMinutes(100),
                from_me: true,
            },
            {
                message: "What's for dinner tonight?",
                send_at: DateUtil.minusMinutes(54),
                from_me: false,
            },
            {
                message: "I can't believe it's almost the weekend!",
                send_at: DateUtil.minusMinutes(40),
                from_me: true,
            },
            {
                message: "Just got a new book. Excited to start reading.",
                send_at: DateUtil.minusMinutes(35),
                from_me: false,
            },
            {
                message: "Looking forward to the upcoming vacation!",
                send_at: DateUtil.minusMinutes(25),
                from_me: true,
            },
            {
                message: "Any recommendations for a good movie?",
                send_at: DateUtil.minusMinutes(15),
                from_me: false,
            },
            {
                message: "Just adopted a cute puppy! Meet Max.",
                send_at: DateUtil.minusMinutes(5),
                from_me: true,
            },
            {
                message: "Enjoying a quiet evening with some music.",
                send_at: DateUtil.minusMinutes(2),
                from_me: false,
            },
            {
                message: "Yeah",
                send_at: DateUtil.minusMinutes(0),
                from_me: true,
            },
        ],
    },
    {
        id: 3,

        image: avatar4Img,
        name: "Roberta K. Simons",
        messages: [
            {
                message: "Hey there!",
                send_at: DateUtil.minusMinutes(140),
                from_me: false,
            },
            {
                message: "How's your day going?",
                send_at: DateUtil.minusMinutes(100),
                from_me: true,
            },
            {
                message: "Did you catch the latest news?",
                send_at: DateUtil.minusMinutes(54),
                from_me: false,
            },
            {
                message: "I'm planning a weekend getaway. Any suggestions?",
                send_at: DateUtil.minusMinutes(40),
                from_me: true,
            },
            {
                message: "Just tried a new recipe. Turned out delicious!",
                send_at: DateUtil.minusMinutes(35),
                from_me: false,
            },
            {
                message: "Looking forward to the weekend. Any exciting plans?",
                send_at: DateUtil.minusMinutes(25),
                from_me: true,
            },
            {
                message: "Have you seen the new movie everyone is talking about?",
                send_at: DateUtil.minusMinutes(15),
                from_me: false,
            },
        ],
    },
    {
        id: 4,

        image: avatar5Img,
        name: "Michael S. Gillen",
        messages: [
            {
                message: "Hey, what's up?",
                send_at: DateUtil.minusMinutes(140),
                from_me: false,
            },
            {
                message: "Did you catch the game last night?",
                send_at: DateUtil.minusMinutes(100),
                from_me: true,
            },
            {
                message: "Thinking of trying a new recipe for dinner.",
                send_at: DateUtil.minusMinutes(54),
                from_me: false,
            },
            {
                message: "Just finished a great workout at the gym.",
                send_at: DateUtil.minusMinutes(40),
                from_me: true,
            },
            {
                message: "Planning a weekend getaway. Any suggestions?",
                send_at: DateUtil.minusMinutes(35),
                from_me: false,
            },
            {
                message: "Excited about the upcoming project at work.",
                send_at: DateUtil.minusMinutes(25),
                from_me: true,
            },
            {
                message: "Looking forward to the weekend. Any fun plans?",
                send_at: DateUtil.minusMinutes(15),
                from_me: false,
            },
        ],
    },
    {
        id: 5,

        image: avatar6Img,
        name: "Pamela W. Boggess",
        messages: [
            {
                message: "Hey there! How's your day going?",
                send_at: DateUtil.minusMinutes(140),
                from_me: false,
            },
            {
                message: "Just wanted to say hi and catch up.",
                send_at: DateUtil.minusMinutes(100),
                from_me: true,
            },
            {
                message: "Any exciting plans for the weekend?",
                send_at: DateUtil.minusMinutes(54),
                from_me: false,
            },
            {
                message: "Have you tried the new restaurant downtown?",
                send_at: DateUtil.minusMinutes(40),
                from_me: true,
            },
            {
                message: "Thinking of starting a new hobby. Any suggestions?",
                send_at: DateUtil.minusMinutes(35),
                from_me: false,
            },
            {
                message: "Did you see that amazing sunset yesterday?",
                send_at: DateUtil.minusMinutes(25),
                from_me: true,
            },
            {
                message: "Found a great podcast - 'Mindful Moments.' Highly recommend!",
                send_at: DateUtil.minusMinutes(15),
                from_me: false,
            },
        ],
    },
    {
        id: 6,

        image: avatar7Img,
        name: "Troy G. Ward",
        messages: [
            {
                message: "How's your day going?",
                send_at: DateUtil.minusMinutes(140),
                from_me: false,
            },
            {
                message: "Just finished a great workout!",
                send_at: DateUtil.minusMinutes(100),
                from_me: true,
            },
            {
                message: "Any plans for the weekend?",
                send_at: DateUtil.minusMinutes(54),
                from_me: false,
            },
            {
                message: "What's your favorite hobby?",
                send_at: DateUtil.minusMinutes(40),
                from_me: true,
            },
            {
                message: "Excited for the upcoming holidays!",
                send_at: DateUtil.minusMinutes(35),
                from_me: false,
            },
            {
                message: "Trying out a new recipe for dinner tonight.",
                send_at: DateUtil.minusMinutes(25),
                from_me: true,
            },
            {
                message: "Any book recommendations",
                send_at: DateUtil.minusMinutes(15),
                from_me: false,
            },
        ],
    },
    {
        id: 7,

        image: avatar8Img,
        name: "Alicia W. Calvillo",
        messages: [
            {
                message: "Hey, how's it going?",
                send_at: DateUtil.minusMinutes(140),
                from_me: false,
            },
            {
                message: "I just finished a great workout!",
                send_at: DateUtil.minusMinutes(100),
                from_me: true,
            },
            {
                message: "Did you watch the latest episode of that show?",
                send_at: DateUtil.minusMinutes(54),
                from_me: false,
            },
            {
                message: "What's your favorite hobby?",
                send_at: DateUtil.minusMinutes(40),
                from_me: true,
            },
            {
                message: "Excited for the weekend plans!",
                send_at: DateUtil.minusMinutes(35),
                from_me: false,
            },
            {
                message: "Any good book recommendations?",
                send_at: DateUtil.minusMinutes(25),
                from_me: true,
            },
            {
                message: "Just tried a new recipe. It turned out amazing!",
                send_at: DateUtil.minusMinutes(15),
                from_me: false,
            },
        ],
    },
];
