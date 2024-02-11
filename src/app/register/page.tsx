import AuthenticatedRedirect from "@/components/auth/authenticated-redirect";
import RegisterPage from "@/components/pages/register-page";
import React from "react";

type Props = {};

const Register = (props: Props) => {
  return (
    <AuthenticatedRedirect>
      <RegisterPage />
    </AuthenticatedRedirect>
  );
};

export default Register;
