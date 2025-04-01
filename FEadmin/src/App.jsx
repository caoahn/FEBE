import { RouterProvider } from "react-router-dom";
import Spin from "./components/Spin";
import { Suspense } from "react";
import router from './routers/ProvideRoutes';
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
      <Suspense fallback={<Spin/>}>
        <RouterProvider router={router}/>
      </Suspense>
  )
}

export default App