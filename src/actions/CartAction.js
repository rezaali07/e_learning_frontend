import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  CLEAR_CART,  // Add CLEAR_CART action type
} from "../constants/CartConstants";
import axios from "axios";

// Add to Cart ---Product
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v2/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART ---Product
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  localStorage.removeItem("cartItems");

};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};

// CLEAR CART AFTER PAYMENT
export const clearCart = () => (dispatch) => {
  dispatch({
    type: CLEAR_CART,  // Action to clear the cart in Redux
  });

  // console.log("Removing cart items from localStorage...");

  localStorage.removeItem("cartItems");  // Remove cart data from localStorage
  localStorage.removeItem("shippingInfo");  // Optionally, clear shipping info
};

//// Cart clear after logout

export const logout = () => async (dispatch) => {
  dispatch({
      type: CLEAR_CART,  // Action to clear the cart in Redux
  });
  
    localStorage.removeItem("cartItems");  // Remove cart data from localStorage
    localStorage.removeItem("shippingInfo");  // Optionally, clear shipping info
};

