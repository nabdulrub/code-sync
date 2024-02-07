import React from "react";
import ConvexClientProvider from "./ConvexClientProvider";

type Props = {};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
};

export default Providers;
