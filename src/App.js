import RootRouters from "./Routing/Routers";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "react-use-cart";
import "./assets/css/customStyle.css";
import "./assets/css/newStyle.css";
import { AppProvider } from "./context/AppContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="flex">
        <AppProvider>
          <CartProvider>
            <BrowserRouter>
              <RootRouters />
            </BrowserRouter>
          </CartProvider>
        </AppProvider>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
