import React from "react";
import EnvironmentCodeEditor from "../dashboard/environment/environment-code-editor";

type Props = {};

const EnvironmentPage = (props: Props) => {
  return (
    <div className="w-full p-10 h-full">
      <EnvironmentCodeEditor />
    </div>
  );
};

export default EnvironmentPage;
