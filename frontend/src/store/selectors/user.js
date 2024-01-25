import { selector } from "recoil";
import { userState } from "../atoms/user";

export const user = selector({
    key : 'userValue',
    get : ({get}) => {
        const state = get(userState)
        return state.isUser
    }
})