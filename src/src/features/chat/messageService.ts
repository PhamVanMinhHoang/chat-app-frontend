import {client} from "@/api/client";

export const getMessagesApi = (conversationId: string) =>
    client.get(`/conversations/${conversationId}/messages`);