import { RouterProvider } from "react-router-dom";
import Spin from "./components/Spin";
import { Suspense } from "react";
import router from './routers/ProvideRoutes';
import { ThemeProvider } from "@material-tailwind/react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RIQd0B0ADzeXvfTp2Dg90GG3MAqxZ0D1UTjyCaiGHA4y52iU04M0lu64RlLbHOiXMNNVp2qUTKltgR9D7r5wnFQ006t5BWsGc');
function App() {
  return (
      <Suspense fallback={<Spin/>}>
        <ThemeProvider>
          <Elements stripe={stripePromise}>
            <RouterProvider router={router}/>
          </Elements>
        </ThemeProvider>
      </Suspense>
  )
}

export default App