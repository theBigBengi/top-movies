// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { PageNotFound } from "./pages/page-not-found";
import { AppLayout } from "./components/app-layout";
import { MoviesPage } from "./pages/movies";
import { Movie } from "./pages/movie";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      refetchOnWindowFocus: false,
      // staleTime: 0,
    },
  },
});

function App() {
  const location = useLocation();

  // The `backgroundLocation` state is the location that we were at when one of
  // the movie links was clicked. If it's there, use it as the location for
  // the <Routes> so we show the movies in the background, behind the modal.
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <QueryClientProvider client={queryClient}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path='/' element={<AppLayout />}>
            <Route index element={<Navigate replace to='movies' />} />
            <Route path='movies' element={<MoviesPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>

        {/* Show the modal when a `backgroundLocation` is set */}
        {state?.backgroundLocation && (
          <Routes>
            <Route path='/movies/:movieId' element={<Movie />} />
          </Routes>
        )}
      </QueryClientProvider>
    </>
  );
}

export default App;
