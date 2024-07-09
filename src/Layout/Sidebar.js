import React from "react";
import { useCart } from "react-use-cart";
import useAddToCart from "../hooks/useAddToCart";

function Sidebar() {
  const { updateItemQuantity, removeItem } = useCart();
  const { handleIncreaseQuantity } = useAddToCart();
  const { items, cartTotal, } = useCart();


  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-96 h-screen pt-16 pb-16 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium mt-8">
            {items?.length > 0 &&
              items?.map((item, index) => (
                <li key={index + 1} >
                  <div
                    className="items-center p-0 mt-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <div className="p-4 bg-white rounded-lg shadow border border-gray-300">
                      <div className="flex items-center">
                        <img
                          className="w-12 h-12 mr-4 rounded-full outline outline-1 outline-offset-4 outline-gray-300"
                          src={item.image}
                          alt="Product Image"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">
                            {item.title}
                          </h3>
                          <p className="text-gray-500 text-xs">Item Price ${item.price}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <span className="font-bold">${item.itemTotal}</span>
                        <div className="flex ml-4">
                          <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)} className="bg-gray-300 text-gray-700 rounded-l px-3 py-1">
                            -
                          </button>
                          <input
                            type="number"
                            readOnly
                            className="w-12 text-center border-t border-b border-gray-300"
                            value={item.quantity}
                          />
                          <button onClick={() => handleIncreaseQuantity(item)} className="bg-gray-300 text-gray-700 rounded-r px-3 py-1">
                            +
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="ml-4 bg-[#3498db] text-white rounded px-3 py-1">🗑</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
