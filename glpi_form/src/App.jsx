import Mynavbar from './navbar/Navbar'
import MyForm from './form/form'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EquiposAsignados from './equiposAsignados/equiposAsignados';
import PdfDocument from './pdf/pdfDocument';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MyForm/>,
  },
  {
    path: "/equipos-asignados",
    element: <EquiposAsignados/>,
  },
  {
    path: "/pdf",
    element: <PdfDocument/>,
  },
]);

const App = () => {
  return (
    <>
      <Mynavbar/>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
