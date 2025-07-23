import {client} from "@/api/client";

export const getMessagesApi = (conversationId: number) =>
    client.get(`/conversations/${conversationId}/messages`);

export const sendMessageApi = (conversationId: number, content: string) =>
    client.post(`/conversations/${conversationId}/messages`, { content });