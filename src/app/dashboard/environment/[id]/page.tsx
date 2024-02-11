import EnvironmentPage from "@/components/pages/environment-page";
import React from "react";

type Props = {
  params: { id: string };
};

const Environment = ({ params: { id } }: Props) => {
  return <EnvironmentPage />;
};

export default Environment;
