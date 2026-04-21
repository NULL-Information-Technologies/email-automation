import { Snackbar, Alert, Slide, Stack } from "@mui/material";
import type { SlideProps } from "@mui/material";
import { useToastStore } from "../store/useToastStore";
import { useTranslation } from "react-i18next";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();
  const {t} = useTranslation()
  return (
    <Stack
      spacing={1.5}
      sx={{
        position: "fixed",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "auto",
      }}
    >
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open
          slots={{
            transition: SlideTransition,
          }}
          autoHideDuration={toast.duration}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            severity={toast.severity}
            variant="filled"
            onClose={() => removeToast(toast.id)}
            sx={{
              minWidth: "max-content",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
              borderRadius: "12px",
              fontWeight: 500,
            }}
          >
            {t(toast.message)}
          </Alert>
        </Snackbar>
      ))}
    </Stack>
  );
};
