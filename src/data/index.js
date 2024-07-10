import { faker } from "@faker-js/faker";
import {
  ChatCircleDots,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

// src/data/conversations.js
export const users = [
  { id: 1, username: "therapist1" },
  { id: 2, username: "therapist2" },
  { id: 3, username: "therapist3" },
  { id: 4, username: "parent1" },
  { id: 5, username: "parent2" },
  { id: 6, username: "parent3" }
];

// export const messages =[
//   {
//     oConversations:conversations,
//     sender:ChatList,
//     content:String
//   }
// ]

export const conversations = [
  {
    id: 1,
    therapist: 1,
    parent: 4,
    status: "active",
    content: [
      { id: 1, sender: 1, content: "Hi, how are you?", timestamp: "2023-07-01T10:00:00Z" },
      { id: 2, sender: 4, content: "I'm good, thank you!", timestamp: "2023-07-01T10:05:00Z" },
      { id: 3, sender: 1, content: "Great to hear!", timestamp: "2023-07-01T10:10:00Z" }
    ]
  },
  {
    id: 2,
    therapist: 2,
    parent: 5,
    status: "active",
    content: [
      { id: 4, sender: 2, content: "Hi, can we reschedule our meeting?", timestamp: "2023-07-02T12:00:00Z" },
      { id: 5, sender: 5, content: "Sure, when would you like to reschedule?", timestamp: "2023-07-02T12:05:00Z" }
    ]
  },
  {
    id: 3,
    therapist: 3,
    parent: 6,
    status: "active",
    content: [
      { id: 6, sender: 3, content: "Hello, how's the therapy going?", timestamp: "2023-07-03T14:00:00Z" },
      { id: 7, sender: 6, content: "It's going well, thanks!", timestamp: "2023-07-03T14:05:00Z" }
    ]
  }
];


const Profile_Menu = [
  {
    title: "Profile",
    icon: <User />,
  },
  {
    title: "Settings",
    icon: <Gear />,
  },
  {
    title: "Logout",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <ChatCircleDots />,
  },
  {
    index: 1,
    icon: <Users />,
  },
  {
    index: 2,
    icon: <Phone />,
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
  },
];

const CallLogs = [
  {
    id:0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
  },
  {
    id:1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: true,
  },
  {
    id:2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: false,
  },
  {
    id:3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: false,
    incoming: true,
  },
  {
    id:4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    missed: true,
    incoming: true,
  }
];

const MembersList = [
  {
    id:0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true
  },
  {
    id:1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false
  },
  {
    id:2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true
  },
  {
    id:3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: false
  },
  {
    id:4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    online: true
  }
];

const ChatList = [
  {
    id: 1,
    name: "John Doe",
    img: "https://via.placeholder.com/150",
    online: true,
    unread: 2,
    pinned: false,
    time: "9:36",
    messages: [
      { id: 1, type: "msg", message: "Hi 👋🏻, How are you?", incoming: true, outgoing: false },
      { id: 2, type: "divider", text: "Today" },
      { id: 3, type: "msg", message: "Hi John, I am good. How about you?", incoming: false, outgoing: true },
      { id: 4, type: "msg", message: "I'm great, thanks for asking!", incoming: true, outgoing: false }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    img: "https://via.placeholder.com/150",
    online: false,
    unread: 1,
    pinned: false,
    time: "9:36",
    messages: [
      // { id: 1, type: "msg", message: "Can you send me the report?", incoming: true, outgoing: false },
      // { id: 2, type: "divider", text: "Yesterday" },
      // { id: 3, type: "msg", message: "Sure, I will send it by EOD.", incoming: false, outgoing: true },
      // { id: 4, type: "msg", message: "Thanks!", incoming: true, outgoing: false }
    ]
  },
  {
    id: 3,
    name: "Alex Johnson",
    img: "https://via.placeholder.com/150",
    online: true,
    pinned: false,
    time: "9:36",
    unread: 0,
    messages: [
      { id: 1, type: "msg", message: "Testing", incoming: true, outgoing: false },
      { id: 2, type: "divider", text: "Today" },
      { id: 3, type: "msg", message: "Yes, I'll be there in 10 minutes.", incoming: false, outgoing: true }
    ]
  }
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },

  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];

const SHARED_LINKS = [
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  }
]

const SHARED_DOCS = [
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
 
]

export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  SHARED_DOCS,
  SHARED_LINKS,
  CallLogs,
  MembersList
};
