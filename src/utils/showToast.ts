import { Dispatch, SetStateAction } from "react";
import { ExternalToast, toast } from "sonner";

const toastVariantStyles = {
  default: { color: "black" },
  black: { color: "white", backgroundColor: "black", border: "none" },
  error: { background: "#ed5858", color: "white" },
  success: { background: "white", color: "black" },
};

export type ShowToastOptions = {
  message: string;
  options?: ExternalToast;
  variant?: keyof typeof toastVariantStyles;
};

export default function showToast(data: ShowToastOptions) {
  const { message, options, variant = "default" } = data;

  return toast(message, {
    ...options,
    style: { ...toastVariantStyles[variant] },
  });
}
