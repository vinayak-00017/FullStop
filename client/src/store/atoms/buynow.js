import { atom } from "recoil";

export const buynowState = atom({
    key : "buynowState",
    default : {
        product : false,
        total : false
    }
})