import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./locales/i18n";
import { ToggleThemeProvider } from "./theme/ToggleThemeProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "./components/ToastContainer.tsx";
import { queryClient } from "./lib/queryClient.tsx";
import { Layout } from "./layouts/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToggleThemeProvider>
      <BrowserRouter>
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </ToggleThemeProvider>
    <ReactQueryDevtools initialIsOpen={false} />
    <ToastContainer />
  </QueryClientProvider>,
);
