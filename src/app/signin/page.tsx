import AuthenticatedRedirect from "@/components/auth/authenticated-redirect";
import SignInPage from "@/components/pages/signin-page";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <AuthenticatedRedirect>
      <SignInPage />
    </AuthenticatedRedirect>
  );
};

export default SignIn;
