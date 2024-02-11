"use client";

import Title from "@/components/ui/title";
import { useGetOwnedEnvironments } from "@/data/useGetOwedEnvironments";
import EnvironmentCard from "../environment/environment-card";

type Props = {};

const OwnedEnvironments = (props: Props) => {
  const { data: environments } = useGetOwnedEnvironments();

  return (
    <div className="px-8 mt-4">
      <Title strong>Your Environments</Title>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
        {environments?.map((environment) => (
          <EnvironmentCard environment={environment} key={environment.id} />
        ))}
      </div>
    </div>
  );
};

export default OwnedEnvironments;
