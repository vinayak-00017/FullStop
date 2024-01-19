import { selector } from "recoil";
import { cartState } from "../atoms/cart";

export const cart = selector({
    key : 'cartValue',
    get : ({get}) => {
        const state = get(cartState)
        return state
    }
})