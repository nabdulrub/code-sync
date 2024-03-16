import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpdateById } from "@/types/ById";
import { Delete } from "@/types/delete";
import { Environment } from "@prisma/client";
import { MoreVertical } from "lucide-react";
import { useSession } from "next-auth/react";
import { HookActionStatus } from "next-safe-action/hooks";
import InviteToEnvironmentModal from "../actions/invite-to-environment-modal";
import RenameEnvironmentModal from "../actions/rename-environment-modal";
import EnvironmentDeleteButton from "./partials/environment-delete-button";
import EnvironmentLeaveButton from "./partials/environment-leave-button";

type Props = {
  deleteEnvironment: (input: Delete) => void;
  leaveEnvironment: (input: UpdateById) => void;
  deleteStatus: HookActionStatus;
  leaveStatus: HookActionStatus;
  environment: Environment;
};

const EnvironmentCardOptions = ({
  deleteEnvironment,
  leaveEnvironment,
  environment,
  deleteStatus,
  leaveStatus,
}: Props) => {
  const { data: session } = useSession();
  const isCreator = session?.user.id === environment.creatorId;

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="absolute top-4 right-3">
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-40">
          <DropdownMenuItem asChild>
            <InviteToEnvironmentModal
              option
              environmentId={environment.id}
              creatorId={environment.creatorId}
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <RenameEnvironmentModal
              id={environment.id}
              name={environment.name}
            />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {isCreator ? (
              <EnvironmentDeleteButton
                onClick={() => deleteEnvironment({ id: environment.id })}
                status={deleteStatus}
              />
            ) : (
              <EnvironmentLeaveButton
                onClick={() => leaveEnvironment({ id: environment.id })}
                status={leaveStatus}
              />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
};

export default EnvironmentCardOptions;
