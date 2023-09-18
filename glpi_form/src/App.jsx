import Mynavbar from './navbar/Navbar'
import MyForm from './form/form'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import EquiposAsignados from './equiposAsignados/equiposAsignados';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MyForm/>,
  },
  {
    path: "/equipos-asignados",
    element: <EquiposAsignados/>,
  },
]);

const App = () => {
  return (
    <>
      <Mynavbar/>
      <RouterProvider router={router} />
      {/* <MyForm/> */}
      {/* <PDFViewer width={"100%"} height={800}>
        <PdfDocument/>
      </PDFViewer> */}
    </>
  );
};

export default App;
