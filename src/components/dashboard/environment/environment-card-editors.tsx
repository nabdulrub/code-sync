import { cn } from "@/lib/utils";
import { EnvironmentEditors } from "@prisma/client";
import EnvironmentEditorAvatar from "./partials/environment-editor-avatar";

type Props = {
  editors: EnvironmentEditors[];
};

const EnvironmentCardEditors = ({ editors }: Props) => {
  const numberOfEditors = editors.length;

  return (
    <div className="flex items-center">
      {editors.map((editor, index) => (
        <EnvironmentEditorAvatar
          style={{ zIndex: numberOfEditors - index }}
          key={editor.id}
          className={cn({
            "-mr-4": index !== numberOfEditors - 1,
          })}
        />
      ))}
      {numberOfEditors > 3 && (
        <span className="ml-1 font-medium text-xl">+</span>
      )}
    </div>
  );
};

export default EnvironmentCardEditors;
