import userIcon from "@/assets/images/user-icon.png";
import Username from "@/components/Username";
import { useConversationMessages } from "@/hooks/conversations";
import useSocket from "@/hooks/useSocket";
import useUserId from "@/hooks/useUserId";
import { Conversation, Message as IMessage } from "@/services/conversations";
import {
    Avatar,
    ChatContainer,
    ConversationHeader,
    Message,
    MessageInput,
    MessageList,
} from "@chatscope/chat-ui-kit-react";
import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

type ChatMessagesProps = {
  conversation: Conversation;
};
const ChatDetails: React.FC<ChatMessagesProps> = ({ conversation }) => {
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [messageInputValue, setMessageInputValue] = useState("");

  const socket = useSocket(conversation.id);

  const { data: messageData, isLoading: loadingMessage } =
    useConversationMessages({
      limit: 1000,
      page: 1,
      id: conversation.id,
    });

  const messages = useMemo(() => messageData?.messages || [], [messageData]);

  const userId = useUserId();

  useEffect(() => {
    setAllMessages(messages);
  }, [messages]);

  useEffect(() => {
    function onNewMessage(message: IMessage) {
      setAllMessages((prev) => [...prev, message]);
    }

    socket?.on("newMessage", onNewMessage);

    return () => {
      socket?.off("newMessage", onNewMessage);
    };
  }, [socket]);

  const onMessageSend = () => {
    socket?.emit("message", {
      message: messageInputValue,
    });
    setMessageInputValue("");
  };

  return (
    <ChatContainer>
      <ConversationHeader>
        <Avatar src={userIcon} />
        <ConversationHeader.Content
          userName={
            <Username
              ids={
                conversation.participantIds.length > 1
                  ? conversation.participantIds
                  : conversation.participantIds.filter((id) => userId !== id)
              }
            />
          }
          info={dayjs(conversation.createdAt).fromNow()}
        />
      </ConversationHeader>
      <MessageList loading={loadingMessage}>
        {allMessages.map((message) => (
          <Message
            model={{
              message: message.message,
              sentTime: dayjs(message.createdAt).fromNow(),
              sender: message.sender.username,
              direction: message.sender.id === userId ? "outgoing" : "incoming",
              position: "single",
            }}
            key={message.id}
          >
            <Avatar src={userIcon} name="Zoe" />
          </Message>
        ))}
      </MessageList>
      <MessageInput
        placeholder="Type message here"
        value={messageInputValue}
        attachButton={false}
        onChange={(val) => setMessageInputValue(val)}
        onSend={onMessageSend}
      />
    </ChatContainer>
  );
};

export default ChatDetails;
