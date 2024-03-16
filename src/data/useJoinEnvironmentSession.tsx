import { Position } from "@/components/dashboard/environment/environment-code-editor";
import { randomBrightColor } from "@/server/utils/randomBrightColor";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export type EnvironmentDataProps = {
  environmentId: string;
  code: string;
};

export type EnvironmentEditorProps = {
  username: string;
  editorId: string;
  color: string;
  position: Position;
};

type useJoinEnvironmentSessionProps = {
  sessionId?: string;
  onRecieve?: (data: EnvironmentDataProps) => void;
};

export const useJoinEnvironmentSession = ({
  sessionId,
  onRecieve,
}: useJoinEnvironmentSessionProps) => {
  const [data, setData] = useState<EnvironmentDataProps | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [activeEditors, setActiveEditors] = useState<EnvironmentEditorProps[]>(
    []
  );
  const [status, setStatus] = useState(false);
  const color = randomBrightColor();

  const { data: session } = useSession();

  useEffect(() => {
    const newSocket = io(
      `${
        process.env.WEBSOCKET_SERVER_HOST ?? "http://localhost:3001"
      }/api/environment`,
      {
        transports: ["websocket"],
        autoConnect: false,
      }
    );

    console.log(newSocket);

    newSocket.connect();

    newSocket.emit("join-environment", sessionId);
    newSocket.emit("environment-editors", {
      environmentId: sessionId,
      user: {
        username: session?.user.username,
        editorId: session?.user.id,
        color,
        position: { lineNumber: 0, column: 0 },
      },
    });

    newSocket.on("environment-editors", setActiveEditors);

    newSocket.on("environment-event", (data) => {
      onRecieve && onRecieve(data);
      setData(data);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [sessionId]);

  function onChange(code: string | undefined) {
    socket?.emit("environment-event", { environmentId: sessionId, code });
  }

  function onCursorPositionChange(position: Position) {
    socket?.emit("environment-editors", {
      environmentId: sessionId,
      user: {
        username: session?.user.username,
        editorId: session?.user.id,
        color,
        position: position,
      },
    });
  }

  useEffect(() => {
    if (!socket) return;

    const handleConnect = () => setStatus(true);
    const handleDisconnect = () => setStatus(false);

    setStatus(socket.connected);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
    };
  }, [socket]);

  return {
    socket,
    onChange,
    onCursorPositionChange,
    data,
    status,
    activeEditors,
  };
};
