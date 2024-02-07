import RegisterButton from "../auth/RegisterButton";
import SignInButton from "../auth/SignInButton";
import Logo from "../brand/logo";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="py-8 px-16 flex justify-between items-center">
      <Logo size="2xl" />
      <div className="flex gap-4">
        <RegisterButton />
        <SignInButton />
      </div>
    </nav>
  );
};

export default Navbar;
