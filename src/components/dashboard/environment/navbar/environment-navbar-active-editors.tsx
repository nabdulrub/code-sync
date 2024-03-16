"use client";

import { useEnvironmentJoinStore } from "@/store/environment-join-store";
import React from "react";
import EnvironmentEditorAvatar from "../partials/environment-editor-avatar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

type Props = {};

const EnvironmentNavbarActiveEditors = (props: Props) => {
  const { activeEditors } = useEnvironmentJoinStore();
  const { data: session } = useSession();

  return (
    <div
      className="flex rounded-xl py-1 px-2 hover:bg-primary/75 bg-accent transition-all duration-300 cursor-pointer"
      title="Environment active users"
    >
      {activeEditors.map((editor, index) => (
        <EnvironmentEditorAvatar
          title={editor.username}
          initials={editor.username[0].toUpperCase()}
          key={editor.editorId}
          highlight={session?.user.id === editor.editorId}
          style={{
            zIndex: activeEditors.length - index,
            backgroundColor: editor.color,
          }}
          className={cn({ "-mr-3": index !== activeEditors.length - 1 })}
        />
      ))}
    </div>
  );
};

export default EnvironmentNavbarActiveEditors;
