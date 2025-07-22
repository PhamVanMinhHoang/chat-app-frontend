import {client} from "@/api/client";

export const getMessagesApi = (conversationId: number) =>
    client.get(`/conversations/${conversationId}/messages`);