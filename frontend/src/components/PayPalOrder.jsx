import { PayPalButtons } from "@paypal/react-paypal-js";
import { BASE_URL } from "../config";

export const PayPalOrder = () => {
    
    const createOrder = (data) => {

        // Order is created on the server and the order id is returned

        return fetch(`${BASE_URL}/paypal/api/orders`, {

          method: "POST",

           headers: {

            "Content-Type": "application/json",

          },

          // use the "body" param to optionally pass additional order information

          // like product skus and quantities

          body: JSON.stringify({
            cart: [
              {
                description: "shoes",
                cost : '543',
              },

            ],

          }),

        })

        .then((response) => response.json())

        .then((order) => order.id);

      };

      const onApprove = (data) => {

         // Order is captured on the server and the response is returned to the browser

         return fetch("/my-server/capture-paypal-order", {

          method: "POST",

           headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            orderID: data.orderID

          })

        })

        .then((response) =>{
            console.log('payment successful', response.json())
            response.json();
        } )

      };

      return (

        <PayPalButtons

          createOrder={(data, actions) => createOrder(data, actions)}

          onApprove={(data, actions) => onApprove(data, actions)}

        />

      );
}