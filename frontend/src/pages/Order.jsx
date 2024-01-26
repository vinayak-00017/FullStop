import { Box } from "@mui/material"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalOrder } from "../components/PayPalOrder";

export const Order = () =>{

    const initialOptions = {
        clientId: "AeS8drftXNk55XdSuHzK28ZlaPKVI-7d-VGTlWYdDdFbZ2tY7QlbUaI-XN51KKIRt45jNV-Nb4iT88lC",
        currency: "USD",
        intent: "capture",
    };

    return(
        <PayPalScriptProvider options={ initialOptions }>
    <Box>
        <PayPalOrder></PayPalOrder>
    </Box>
    </PayPalScriptProvider >
)}