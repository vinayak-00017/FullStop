import { selector } from "recoil";
import { cartState } from "../atoms/cart";

export const cartItemCount = selector({
    key: 'cartItemCount',
    get: ({get}) => {
        const cartItems = get(cartState);
        return cartItems.length;
    }
})