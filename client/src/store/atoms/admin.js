import { atom } from "recoil";


export const adminState = atom({
    key : 'adminState',
    default : {
        isLoading : true,
        isAdmin : false 
    }
})