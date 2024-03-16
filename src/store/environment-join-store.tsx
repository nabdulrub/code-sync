"use client";

import { Position } from "@/components/dashboard/environment/environment-code-editor";
import {
  EnvironmentDataProps,
  EnvironmentEditorProps,
  useJoinEnvironmentSession,
} from "@/data/useJoinEnvironmentSession";
import extractIdFromUrl from "@/utils/extractIdFromPathname";
import { usePathname } from "next/navigation";
import React, { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

type EnvironmentJoinStoreProps = {
  status?: boolean | null;
  socket?: Socket | null;
  data: EnvironmentDataProps | null;
  activeEditors: EnvironmentEditorProps[];
  onChange: (code: string | undefined) => void;
  onCursorPositionChange: (position: Position) => void;
};

const EnvironmentJoinStore = createContext<EnvironmentJoinStoreProps>({
  status: null,
  socket: undefined,
  data: null,
  activeEditors: [],
  onChange: () => null,
  onCursorPositionChange: () => null,
});

export const useEnvironmentJoinStore = () => {
  try {
    const context = useContext(EnvironmentJoinStore);

    return context;
  } catch (error) {
    throw new Error(
      "Cannot use environment join store outside of its provider!"
    );
  }
};

export const EnvironmentJoinStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const id = extractIdFromUrl(pathname);
  const { socket, status, onChange, data, activeEditors } =
    useJoinEnvironmentSession({
      sessionId: id,
    });

  return (
    <EnvironmentJoinStore.Provider
      value={{
        socket,
        status,
        onChange,
        data,
        activeEditors,
        onCursorPositionChange
        ,
      }}
    >
      {children}
    </EnvironmentJoinStore.Provider>
  );
};
