import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./shared/Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const queryClient = new QueryClient();

// 배포 환경에서 console.log, console.warn, console.error 지우기
if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
  console.error = function no_console() {};
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router />

      <ToastContainer
        position="top-center"
        style={{ width: "500px", height: "100px" }}
      />
    </QueryClientProvider>
  );
};

export default App;
