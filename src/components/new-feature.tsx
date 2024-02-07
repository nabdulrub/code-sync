import { ArrowRight } from "lucide-react";

type NewFeatureProps = {
  title?: string;
  feature?: string;
};

const NewFeature = ({
  title = "New Feature",
  feature = "Tailored cover letters in seconds",
}: NewFeatureProps) => {
  return (
    <div className="group relative flex w-fit items-center justify-center gap-1 rounded-xl border-2 border-gray-400 bg-secondary font-semibold  px-1 pr-2 text-sm ">
      <div className="my-1 flex items-center justify-center rounded-lg border-2 border-gray-400  px-2 transition-all duration-300 bg-primary group-hover:text-white">
        <h3>{title}</h3>
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className="ml-1">
        <p>{feature}</p>
      </div>
      <span className="flex bg-white/30 blur-xl -z-10 w-full h-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

export default NewFeature;
