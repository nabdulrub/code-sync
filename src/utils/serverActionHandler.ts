import { ServerActionReturn } from "@/types/server-action";

type ServerActionHandlerProps<T = any> = {
  serverAction: () => Promise<ServerActionReturn<T>>;
  preAction?: () => void;
  rules?: () => boolean;
  onSuccess?: (data?: T) => void;
  onFail?: (error: any) => void;
};

export async function serverActionHandler<T = any>(
  options: ServerActionHandlerProps<T>
) {
  const { serverAction, onFail, onSuccess, rules, preAction } = options;

  if (preAction) {
    preAction();
  }

  if (rules && !rules()) {
    onFail && onFail("Failed to complete action, rules not met!");
    return;
  }

  const result = await serverAction();

  if (result.success) {
    onSuccess && onSuccess(result.data);
  }

  if (!result.success) {
    onFail && onFail(result.error);
  }
}
