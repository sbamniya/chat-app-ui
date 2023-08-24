import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import useUserId from "./useUserId";

const useSocket = (conversationId: string) => {
  const [socket, setSocket] = useState<Socket>();
  const userId = useUserId();

  useEffect(() => {
    let newSocket: Socket;
    if (userId && conversationId) {
      newSocket = io(String(process.env.SOCKET_URL), {
        transports: ["websocket", "polling"],
        query: {
          userId,
          conversationId,
        },
      });

      setSocket(newSocket);
    }

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, conversationId]);

  return socket;
};

export default useSocket;
