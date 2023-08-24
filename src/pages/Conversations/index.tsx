import { Conversation } from "@/services/conversations";
import { MainContainer, Search, Sidebar } from "@chatscope/chat-ui-kit-react";
import React, { useState } from "react";
import ChatDetails from "./ChatDetails";
import ConversationSidebar from "./ConversationSidebar";
import styles from "./styles.module.scss";

const Conversations: React.FC = () => {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation>();

  return (
    <div className={styles.chatContainer}>
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />

          <ConversationSidebar
            onSelect={(selected) => setSelectedConversation(selected)}
            selected={selectedConversation?.id || ""}
          />
        </Sidebar>

        {selectedConversation && (
          <ChatDetails conversation={selectedConversation} />
        )}
      </MainContainer>
    </div>
  );
};

export default Conversations;
