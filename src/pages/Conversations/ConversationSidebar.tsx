import userIcon from "@/assets/images/user-icon.png";
import Username from "@/components/Username";
import { useConversations } from "@/hooks/conversations";
import useUserId from "@/hooks/useUserId";
import { Conversation as ConversationType } from "@/services/conversations";
import {
  Avatar,
  Conversation,
  ConversationList,
} from "@chatscope/chat-ui-kit-react";
import dayjs from "dayjs";
import React, { useMemo } from "react";
import StartChat from "./StartChat";

type ConversationSidebarProps = {
  onSelect: (conversation: ConversationType) => void;
  selected: string;
};

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  onSelect,
  selected,
}) => {
  const userId = useUserId();

  const { data, isLoading } = useConversations({
    limit: 100,
    page: 1,
  });

  const allConversations = useMemo(() => data?.allConversations || [], [data]);

  return (
    <ConversationList loading={isLoading}>
      <Conversation>
        <Conversation.Content>
          <StartChat />
        </Conversation.Content>
      </Conversation>

      {allConversations.map((conversation) => (
        <Conversation
          name={
            <Username
              ids={
                conversation.participantIds.length > 1
                  ? conversation.participantIds
                  : conversation.participantIds.filter((id) => userId !== id)
              }
            />
          }
          lastSenderName={conversation.messages[0].sender.username}
          info={conversation.messages[0].message}
          key={conversation.id}
          lastActivityTime={dayjs(conversation.messages[0].createdAt).fromNow()}
          onClick={() => {
            onSelect(conversation);
          }}
          active={conversation.id === selected}
        >
          <Avatar src={userIcon} />
        </Conversation>
      ))}
    </ConversationList>
  );
};

export default ConversationSidebar;
