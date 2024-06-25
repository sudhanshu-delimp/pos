import "./App.css";

import RootRouters from "./Routing/Routers";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "react-use-cart";
import "./assets/css/customStyle.css";
function App() {
  return (
    <div className="App">
      <div className="flex">
        <CartProvider>
          <RootRouters />
        </CartProvider>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
