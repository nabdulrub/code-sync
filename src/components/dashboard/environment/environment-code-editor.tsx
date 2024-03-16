"use client";

import useGetEnvironmentSession from "@/data/useGetEnvironmentSession";
import { cn } from "@/lib/utils";
import { useEnvironmentJoinStore } from "@/store/environment-join-store";
import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

type Props = {};

export type Position = {
  lineNumber?: number;
  column?: number;
};

const CURSOR_LEFT_START_POSITION = 58;
const CURSOR_LETTER_INCREMENT_VALUE = 7.685;

const CURSOR_LINEHEIGHT_START_POSITION = 2;
const CURSOR_LINEHEIGHT_INCREMENT_VALUE = 20;

const EnvironmentCodeEditor = (props: Props) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [cursorPosition, setCursorPosition] = useState<Position>({});
  const [currentEditor, setCurrentEditor] = useState<any>();

  // Data & Sessions
  const { data: environment } = useGetEnvironmentSession();
  const {
    data: session,
    onChange: onCodeChange,
    activeEditors: editors,
  } = useEnvironmentJoinStore();

  const onMount = (editor: any) => {
    setCurrentEditor(editor);
    editor.focus();
    editor.updateOptions({ lineHeight: 20 });
  };

  useEffect(() => {
    if (!currentEditor) return;

    currentEditor.onDidChangeCursorPosition((e) => {
      setCursorPosition(e.position);
    });
  }, [currentEditor]);

  useEffect(() => {
    setValue(session?.code);
  }, [session]);

  console.log(editors);

  return (
    environment?.data && (
      <>
        <div className="bg-red-500 rounded-2xl overflow-hidden h-full w-full relative">
          <Editor
            defaultLanguage={environment?.data?.language}
            defaultValue="// Start editing here..."
            className="w-full h-full"
            onMount={onMount}
            theme="vs-dark"
            value={value}
            onChange={(e) => onCodeChange(e)}
          />
          <span
            style={{
              left:
                (cursorPosition.column
                  ? cursorPosition.column * CURSOR_LETTER_INCREMENT_VALUE
                  : 0) + CURSOR_LEFT_START_POSITION,
              top:
                (cursorPosition.lineNumber
                  ? (cursorPosition.lineNumber - 1) *
                    CURSOR_LINEHEIGHT_INCREMENT_VALUE
                  : 0) + CURSOR_LINEHEIGHT_START_POSITION,
            }}
            className={cn("absolute bg-red-500 w-[2px] h-4 animate-pulse")}
          />
        </div>
      </>
    )
  );
};

export default EnvironmentCodeEditor;
