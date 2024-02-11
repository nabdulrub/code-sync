import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  show: boolean;
};

const Loader = ({ show }: Props) => {
  return show ? (
    <div className="animate-spin absolute top-1/2 left-1/2">
      <Loader2 className="w-12 h-12 absolute -translate-x-1/2 -translate-y-1/2" />
    </div>
  ) : null;
};

export default Loader;
