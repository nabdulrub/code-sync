"use client";

import { useEnvironmentListContext } from "@/context/EnvironmentListProvider";
import { getAllOwnedEnvironments } from "@/server-actions/environment";
import { serverActionHandler } from "@/utils/serverActionHandler";
import React from "react";

type Props = {};

const OwnedEnvironments = (props: Props) => {
  const { environments, isLoading } = useEnvironmentListContext();
  return (
    <div>{isLoading ? <p>Loading..</p> : JSON.stringify(environments)}</div>
  );
};

export default OwnedEnvironments;
