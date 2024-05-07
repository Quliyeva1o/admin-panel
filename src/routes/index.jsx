import AdminRoot from "../pages/Admin";
import Dashboard from "../pages/Admin/dashboard";
import AdminCountries from "../pages/Admin/countries";
import AdminCountryDetail from "../pages/Admin/countryDetail";
import AdminLogin from "../pages/Admin/login";
import AddCountry from "../pages/Admin/add-country";
import ClientRoot from "../pages/Client";
import Home from "../pages/Client/home";
import About from "../pages/Client/about";
import Contact from "../pages/Client/contact";
import ClientCountries from "../pages/Client/countries";
import ClientCountryDetail from "../pages/Client/countryDetail";
import ContactUs from "../pages/Client/contact-us";
import MessagesAdmin from "../pages/Admin/messages";

export const ROUTES = [
  //admin root
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "countries",
        element: <AdminCountries />,
      },
      {
        path: "countries/:id",
        element: <AdminCountryDetail />,
      },
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "add-country",
        element: <AddCountry />,
      },
      {
        path: "messages",
        element: <MessagesAdmin/>,
      },
    ],
  },
  //client root
  {
    path: "/",
    element: <ClientRoot />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "countries",
        element: <ClientCountries />,
      },
      {
        path: "countries/:id",
        element: <ClientCountryDetail />,
      },
      {
        path: "contact-us",
        element: <ContactUs/>,
      },
    ],
  },
];
