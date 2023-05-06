import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { FormationsPage } from './Pages/FormationPage/FormationsPage';
import { WorkshopsPage } from './Pages//WorkshopsPage/WorkshopsPage';
import { Organisation } from './Pages/Organisation/Organisation';
import { FeedbackPage } from './Pages/FeedbackPage/FeedbackPage';
import { Users } from './Pages/Users/Users';
import { FormationElement } from './Pages/FormationPage/FormationElement';
import { WorkshopElement } from './Pages/WorkshopsPage/WorkshopElement';
import { FeedbackWorkshops } from './Pages/FeedbackWorkshops/FeedbackWorkshops';
import Login from './Login/Login';
import { AdminLogin } from './Login/AdminLogin/AdminLogin';
import { AdminInterface } from './Login/AdminLogin/AdminInterface';

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/formations",
    element: <FormationsPage />,
  },
  {
  path: "/workshops",
    element: <WorkshopsPage />,
  },
  {
    path: "/organisation",
      element: <Organisation />,
  },
  {
    path: "/feedback",
      element: <FeedbackPage />,
  },
  {
    path: "/feedbackWorkshops",
      element: <FeedbackWorkshops />,
  },
  {
    path: "/users",
      element: <Users />,
  },
  {
    path: "/formations/:id",
      element: <FormationElement />,
  },
  {
    path: "/workshops/:id",
      element: <WorkshopElement />,
  },
  {
    path: "/",
      element: <Login />,
  },
  {
    path: "/admin",
      element: <AdminLogin />,
  },
  {
    path: "/adminInterface",
      element: <AdminInterface />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
