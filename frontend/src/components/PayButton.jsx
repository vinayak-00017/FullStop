import {Button} from '@mui/material'


export const PayButton = () => {

    const handleCheckout = () => {
        console.log("hi")
    }

    return (
        <>
            <Button onClick={()=> handleCheckout()}></Button>
        </>
    )
}