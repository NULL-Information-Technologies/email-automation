// store/useToastStore.ts
import { create } from "zustand";
import type { AlertColor } from "@mui/material";

interface Toast {
  id: number;
  message: string;
  severity: AlertColor;
  duration: number;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, severity?: AlertColor, duration?: number) => void;
  removeToast: (id: number) => void;
}

let toastId = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, severity = "info", duration = 2000) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        { id: ++toastId, message, severity, duration },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));