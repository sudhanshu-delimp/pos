import { useState } from "react";
import { useCart } from "react-use-cart";

import { notifyError, notifySuccess } from "../utils/toast";

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const { addItem, items, updateItemQuantity } = useCart();

  const handleAddItem = (product) => {
    const result = items.find((i) => i.id === product.id);
    const { description, ...updatedProduct } = product;
    if (result !== undefined) {
      addItem(updatedProduct, item);
      notifySuccess(`${item} ${product.title} added to cart!`);
    } else {
      addItem(updatedProduct, item);
      notifySuccess(`${item} ${product.title} added to cart!`);
    }
  };

  const handleIncreaseQuantity = (product) => {
    const result = items?.find((p) => p.id === product.id);
    if (result) {
      updateItemQuantity(product.id, product.quantity + 1);
    }
  };

  return {
    setItem,
    item,
    handleAddItem,
    handleIncreaseQuantity,
  };
};

export default useAddToCart;
