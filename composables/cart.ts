import { useState } from "#app";
import type { CartProduct, Product } from "@/types";

export const useCart = () => {
  const isCartOpen = useState<boolean>("isCartOpen", () => false);
  const cartProducts = useState<CartProduct[]>("cartProducts", () => []);

  const setIsCartOpen = (isOpen: boolean) => {
    isCartOpen.value = isOpen;
  };

  const addProductToCart = (product: Product) => {
    const existingProduct = cartProducts.value.find(
      (existingProduct) => existingProduct.product_id === product.product_id
    );
    if (existingProduct) {
      const filteredProducts = cartProducts.value.filter(
        (existingProduct) => existingProduct.product_id !== product.product_id
      );
      cartProducts.value = [
        { ...existingProduct, quantity: existingProduct.quantity + 1 },
        ...filteredProducts,
      ];
    } else {
      cartProducts.value = [{ ...product, quantity: 1 }, ...cartProducts.value];
    }
  };

  const removeProductFromCart = (cartProduct: CartProduct) => {
    cartProducts.value = cartProducts.value.filter(
      (product) => product.product_id !== cartProduct.product_id
    );
  };

  const decrementProductFromCart = (productToDecrement: CartProduct) => {
    cartProducts.value = cartProducts.value.map((product) => {
      if (product.product_id === productToDecrement.product_id) {
        return {
          ...product,
          quantity:
            product.quantity > 1 ? product.quantity - 1 : product.quantity,
        };
      }
      return product;
    });
  };

  return {
    isCartOpen,
    cartProducts,
    setIsCartOpen,
    addProductToCart,
    removeProductFromCart,
    decrementProductFromCart,
  };
};
