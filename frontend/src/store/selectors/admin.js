import { selector } from "recoil";
import { adminState } from "../atoms/admin";


export const admin = selector({
    key : 'adminValue',
    get : ({get}) => {
        const state = get(adminState)
        return state.isAdmin
    }
})