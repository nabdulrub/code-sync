"use client";

import { getAllOwnedEnvironments } from "@/server-actions/environment";
import { Environment } from "@prisma/client";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "@tanstack/react-query";

type EnvironmentListContextType = {
  environments: Environment[];
  isLoading: boolean;
  refetch: () => void;
};

const EnvironmentListContext = createContext<EnvironmentListContextType>({
  environments: [],
  isLoading: false,
  refetch: () => null,
});

export function EnvironmentListProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [environments, setEnvironments] = useState<Environment[]>([]);

  async () => {
    const response = await getAllOwnedEnvironments();
    if (!response.success) {
      throw new Error(response.error);
    }
    return response.data;
  };

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["environments"],
    queryFn: async () => {
      const response = await getAllOwnedEnvironments();
      if (!response.success) {
        throw new Error(response.error);
      }
      return response.data;
    },
  });

  useEffect(() => {
    if (data) {
      setEnvironments(data);
    }
  }, [data]);

  return (
    <EnvironmentListContext.Provider
      value={{ environments, refetch, isLoading }}
    >
      {children}
    </EnvironmentListContext.Provider>
  );
}

export const useEnvironmentListContext = () => {
  try {
    const context = useContext(EnvironmentListContext);
    return context;
  } catch (error) {
    throw new Error("EnvironmentListContext must be used in the dashboard");
  }
};
