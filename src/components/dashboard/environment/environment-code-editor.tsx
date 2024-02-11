"use client";

import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

type Props = {};

const EnvironmentCodeEditor = (props: Props) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");

  const onMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="bg-red-500 rounded-2xl overflow-hidden h-full w-full">
      <Editor
        defaultLanguage="javascript"
        className="w-full h-full"
        onMount={onMount}
        theme="vs-dark"
      />
    </div>
  );
};

export default EnvironmentCodeEditor;
