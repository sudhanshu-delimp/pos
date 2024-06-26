import RootRouters from "./Routing/Routers";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "react-use-cart";
import "./assets/css/customStyle.css";
import "./assets/css/newStyle.css";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
       <>
      <AppProvider>
        <CartProvider>
          <BrowserRouter>
            <RootRouters />
          </BrowserRouter>
        </CartProvider>
      </AppProvider>
      <ToastContainer />
      </>
  );
}

export default App;
