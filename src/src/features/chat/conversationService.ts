import {client} from "@/api/client";

export const getConversationsApi = () =>
    client.get('/conversations');