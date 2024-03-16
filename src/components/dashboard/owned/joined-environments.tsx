"use client";

import Title from "@/components/ui/title";
import { useGetJoinedEnvironments } from "@/data/useGetJoinedEnvironments";
import EnvironmentCard from "../environment/environment-card";

type Props = {};

const JoinedEnvironments = (props: Props) => {
  const { data: joinedEnvironments } = useGetJoinedEnvironments();
  return (
    <div className="px-8 mt-4">
      <Title strong>Joined Environments</Title>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
        {joinedEnvironments?.map((environment) => (
          <EnvironmentCard
            environment={environment}
            key={environment.id}
            variant={"secondary"}
          />
        ))}
      </div>
    </div>
  );
};

export default JoinedEnvironments;
