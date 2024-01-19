import { selector } from "recoil";
import { cartState } from "../atoms/cart";

export const cartTotalPrice = selector({
    key: 'cartTotalPrice',
    get : ({get}) => {
        const cart = get(cartState);
        return cart.reduce((total,{item,quantity,size}) => {
            const itemPrice = (item.price-(item.discount*item.price)/100) || 0
            return total + itemPrice * quantity
        },0)
    }
})