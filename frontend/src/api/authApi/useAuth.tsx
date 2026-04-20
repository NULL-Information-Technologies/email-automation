// hooks/useAuth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "./authTypes";
import { useToastStore } from "../../store/useToastStore";
import axiosConfig from "../../lib/axios.config";
import { useAuthStore } from "../../store/useAuthStore";

// -----------------------
// API Fonksiyonları
// -----------------------
const loginApi = async (
  credentials: LoginCredentials,
): Promise<AuthResponse> => {
  const { data } = await axiosConfig.post<AuthResponse>(
    "auth/login",
    credentials,
  );

  if (data.success && data.accessToken) {
    localStorage.setItem(
      "accessToken",
      data.accessToken.replace("Bearer ", ""),
    );
  }

  return data;
};

const registerApi = async (
  credentials: RegisterCredentials,
): Promise<AuthResponse> => {
  const { data } = await axiosConfig.post<AuthResponse>(
    "auth/register",
    credentials,
  );
  return data;
};

const loadUserApi = async (): Promise<AuthResponse> => {
  const { data } = await axiosConfig.post<AuthResponse>("auth/load-user");
  return data;
};

const logoutApi = async (): Promise<{ok: boolean} > => {
  const { data } = await axiosConfig.post<{ok: boolean}>("auth/logout");
  return data;
};
// -----------------------
// React Query Hooks
// -----------------------
export const useLogin = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),

    onSuccess: (data) => {
      if (data.success) {
        login({ id: data.id, fullName: data.fullName, email: data.email });
        addToast("toast.loginSuccess", "success");
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      } else {
        addToast(data.message || "Giriş başarısız", "error");
      }
    },

    onError: () => {
      addToast("toast.loginError", "error");
    },
  });
};

export const useRegister = () => {
  const addToast = useToastStore((state) => state.addToast);

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => registerApi(credentials),

    onSuccess: (data) => {
      if (data.success) {
        addToast("toast.registerSuccess", "success");
      } else {
        addToast(data.message || "Kayıt başarısız", "error");
      }
    },

    onError: () => {
      addToast("toast.registerError", "error");
    },
  });
};

export const useLoadUser = () => {
  const queryClient = useQueryClient();
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: loadUserApi,
    onSuccess: (data) => {
      queryClient.removeQueries({ queryKey: ["authUser"] });
      if (data.success) {
        login({ id: data.id, fullName: data.fullName, email: data.email });
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
      
    },
    onError: (error) => {
     
      console.log(error);
      
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const addToast = useToastStore((state) => state.addToast);
    const { logout } = useAuthStore();
  return useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      cookieStore.get("")
      localStorage.removeItem("accessToken")
      logout()
      queryClient.removeQueries({ queryKey: ["authUser"] });
      addToast("toast.logoutSuccess", "success");
    },

    onError: () => {
      addToast("toast.logoutError", "error");
    },
  });
};
