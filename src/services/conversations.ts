import graphQLClient from "@/utils/graphql";
import { gql } from "graphql-request";

export interface Conversation {
  id: string;
  messages: Message[];
  startedBy: string;
  createdAt: string;
  participantIds: string[];
}

export interface Message {
  id: string;
  message: string;
  sender: Sender;
  createdAt: string;
}

export interface Sender {
  id: string;
  username: string;
}

const CONVERSATION_QUERY = gql`
  query AllConversations($limit: Int!, $page: Int!) {
    allConversations(limit: $limit, page: $page) {
      id
      messages {
        id
        message
        createdAt
        sender {
          id
          username
        }
      }
      startedBy
      createdAt
      participantIds
    }
  }
`;

export const getAllConversations = async (variables: {
  limit: number;
  page: number;
}): Promise<{ allConversations: Conversation[] }> =>
  graphQLClient.request({
    document: CONVERSATION_QUERY,
    variables,
  });

const CREATE_CONVERSATION_MUTATION = gql`
  mutation CreateConversation($input: ConversationInput) {
    createConversation(input: $input) {
      id
      startedBy
      createdAt
    }
  }
`;

export const startConversation = async (input: {
  message?: string;
  receiverIds: string[];
}): Promise<{ createConversation: Record<string, string> }> =>
  graphQLClient.request({
    document: CREATE_CONVERSATION_MUTATION,
    variables: { input },
  });

const MESSAGE_QUERY = gql`
  query Message($limit: Int!, $page: Int!, $id: String!) {
    messages(limit: $limit, page: $page, id: $id) {
      id
      message
      createdAt
      sender {
        id
        username
      }
    }
  }
`;

export const getMessageByConversation = async (variables: {
  limit: number;
  page: number;
  id: string;
}): Promise<{ messages: Message[] }> =>
  graphQLClient.request({
    document: MESSAGE_QUERY,
    variables,
  });
