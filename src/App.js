import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import EmployeeForm from "./components/employee/EmployeeForm";
import EmployeeList from "./components/employee/EmployeeList";
import Login from "./components/login/Login";
import Layout from "./components/layout/Layout";

function App() {
const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/",
        element:<Dashboard/>
      },
      {
        path:"/list",
        element:<EmployeeList/>,
       
      },
      {
        path:"/employee",
        element:<EmployeeForm/>
      },
    ]
  },
  {
    path:"/login",
    element:<Login/>
  }
])

  return (
      <>
      <RouterProvider router={router}/>
      </>
  
  );
}

export default App;
