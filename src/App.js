import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import LibraryCollectionPage from "./pages/LibraryCollectionPage";
import UsersPage from "./pages/UsersPage";
import AuthorsPage from "./pages/AuthorsPage";
import { ToastProvider } from "./context/ToastContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/books",
        element: <LibraryCollectionPage/>
      },
      {
        path: "/members",
        element: <UsersPage/>,
      },
      {
        path: "/authors",
        element: <AuthorsPage/>
      }
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ToastProvider> {/* Wrap with ToastProvider */}
        <RouterProvider router={router}/>
      </ToastProvider>
    </Provider>
  );
}

export default App;