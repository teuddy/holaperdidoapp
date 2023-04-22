import { Message } from "./Message";

export type Room = {
    rid: string;
    name: string;
    image_url: string;
    messages: Message[];
};