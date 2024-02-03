import {atom} from 'recoil'

export const addressState = atom({
    key : 'addressState',
    default : {
        houseAddress : 'Redmane Castle',
        name : 'Starscourge Radahn',
        city : 'Caelid',
        country : 'Lands Between',
        zip : '70000',
        mobileNumber : '4444444444'
    }
})