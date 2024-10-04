import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "react-query";

import { Movies } from "./features/movies/movies";
import { MoviesTableOperations } from "./features/movies/movies-table-operations";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Navigate replace to='movies' />} />
            <Route
              path='movies'
              element={
                <>
                  <MoviesTableOperations />
                  <Movies />
                </>
              }
            />

            {/* <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} /> */}
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
