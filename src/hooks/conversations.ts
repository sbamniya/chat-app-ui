import {
  getAllConversations,
  getMessageByConversation,
  startConversation,
} from "@/services/conversations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEYS = {
  CONVERSATION_LIST: "conversation-list",
  CONVERSATION_MESSAGE: "conversation-messages",
};

export const useConversations = (
  params: Parameters<typeof getAllConversations>[0]
) =>
  useQuery([QUERY_KEYS.CONVERSATION_LIST, { ...params }], () =>
    getAllConversations(params)
  );

export const useStartConversationMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(startConversation, {
    onSuccess() {
      queryClient.invalidateQueries([QUERY_KEYS.CONVERSATION_LIST]);
    },
  });
};

export const useConversationMessages = (
  params: Parameters<typeof getMessageByConversation>[0]
) =>
  useQuery(
    [QUERY_KEYS.CONVERSATION_MESSAGE, { ...params }],
    () => getMessageByConversation(params),
    {
      enabled: Boolean(params.id),
    }
  );
