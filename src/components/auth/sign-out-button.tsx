import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

type Props = {};

const SignOutButton = (props: Props) => {
  return (
    <Button
      size="icon"
      className="bg-transparent hover:bg-destructive hover:text-black"
      onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })}
    >
      <LogOut className="w-7 h-7" />
    </Button>
  );
};

export default SignOutButton;
