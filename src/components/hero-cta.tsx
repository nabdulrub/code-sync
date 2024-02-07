import React from "react";
import RegisterButton from "./auth/RegisterButton";
import SignInButton from "./auth/SignInButton";
import NewFeature from "./new-feature";

type Props = {};

const HeroCTA = (props: Props) => {
  return (
    <div className="grid gap-8">
      <NewFeature title="New Feature" feature="Real Time Collaboration" />
      <h1 className="text-xl lg:text-3xl xl:text-6xl font-bold">
        Collaborate on code with friends seamlessly!
      </h1>
      <p className="md:max-w-[700px] text-lg">
        CodeSync offers a great way to collaborate with fellow programmers on
        small environments with a terminal allowing everyone to look at the same
        thing at once!
      </p>
      <div className="flex gap-4">
        <RegisterButton />
        <SignInButton />
      </div>
    </div>
  );
};

export default HeroCTA;
