import { selector } from "recoil";


export const caetTotalPrice = selector({
    key: 'cartTotalPrice',
    get : ({get}) => {
        const cart = get(cartState);
        return cart.reduce((total,item) => total + item.price * item.quantity, 0)
    }
})