import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete } from "@/types/delete";
import { MoreVertical } from "lucide-react";
import { HookActionStatus } from "next-safe-action/hooks";
import EnvironmentDeleteButton from "./environment-delete-button";
import RenameEnvironmentModal from "../actions/rename-environment-modal";
import { Environment } from "@prisma/client";
import { Dialog } from "@/components/ui/dialog";

type Props = {
  deleteRecord: (input: Delete) => void;
  status: HookActionStatus;
  environment: Environment;
};

const EnvironmentCardOptions = ({
  deleteRecord,
  environment,
  status,
}: Props) => {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-4 right-3">
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Invite</DropdownMenuItem>
          <DropdownMenuItem asChild>
            <RenameEnvironmentModal
              id={environment.id}
              name={environment.name}
            />
          </DropdownMenuItem>
          <DropdownMenuItem>
            <EnvironmentDeleteButton
              onClick={() => deleteRecord({ id: environment.id })}
              status={status}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default EnvironmentCardOptions;
