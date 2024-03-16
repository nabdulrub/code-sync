import { Badge } from "@/components/ui/badge";
import { LanguageOptions } from "@/types/environment";

export type VariantProps =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | null
  | undefined;

type Props = {
  language: LanguageOptions;
  variant?: VariantProps;
};

const EnvironmentLanguageBadge = ({
  language,
  variant = "secondary",
}: Props) => {
  return (
    <Badge variant={variant} className="capitalize">
      {language}
    </Badge>
  );
};

export default EnvironmentLanguageBadge;
