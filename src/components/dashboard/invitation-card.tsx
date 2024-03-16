import { useGetNotifications } from "@/data/useGetNotifications";
import {
  InvitiationsWithEnvironment,
  joinInvitiation,
} from "@/server/actions/invitiations";
import showToast from "@/utils/showToast";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  invitiation: InvitiationsWithEnvironment;
};

const InvitationCard = ({ invitiation }: Props) => {
  const router = useRouter();
  const { refetch: updateInvitiations } = useGetNotifications();
  const { execute, status } = useAction(joinInvitiation, {
    onSuccess: async () => {
      await updateInvitiations();
      router.push(`/dashboard/environment/${invitiation.environmentId}`);
      showToast({
        message: `Joined ${invitiation.environment.name}`,
        variant: "success",
      });
    },

    onError(e) {
      showToast({
        message: e.serverError || "",
        variant: "error",
      });
    },
  });

  return (
    <Card className="flex items-center m-2 hover:bg-secondary/50 transition-[background] duration-300">
      <CardHeader>
        <CardTitle>
          New Invitiation to
          <span className="font-bold">{invitiation.environment.name}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Button
          disabled={status === "executing"}
          onClick={() =>
            execute({
              environmentId: invitiation.environmentId,
              invitationId: invitiation.id,
            })
          }
        >
          {status === "executing" ? "Joining..." : "Join"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default InvitationCard;
