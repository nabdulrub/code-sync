"use client";

import { useMutation } from "convex/react";
import Image from "next/image";
import { useState } from "react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const [text, setText] = useState("");
  const createTodo = useMutation(api.todos.createTodo);

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createTodo({ text });
        }}
      >
        <input onChange={(e) => setText(e.target.value)} />
        <button>submit</button>
      </form>
    </div>
  );
}
