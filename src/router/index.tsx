import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout";
import { Suspense, lazy } from "react";
import LoadingSpinner from "../components/BaseLoading";

const PostContainer = lazy(() => import("../view/Post"));
const AlbumsContainer = lazy(() => import("../view/Albums"));

const createLazyElement = (component: JSX.Element) => (
  <Suspense fallback={<LoadingSpinner />}>{component}</Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      { path: "/", element: createLazyElement(<PostContainer />) },
      { path: "/album", element: createLazyElement(<AlbumsContainer />) },
    ],
  },
]);

export default router;
