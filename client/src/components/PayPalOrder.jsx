import { PayPalButtons } from "@paypal/react-paypal-js";
import { BASE_URL } from "../config";
import { useRecoilValue } from "recoil";
import { cartTotalPrice } from "../store/selectors/cartTotalPrice";
import { user } from "../store/selectors/user";

export const PayPalOrder = () => {
    
  const totalCost = useRecoilValue(cartTotalPrice)
  const userName = useRecoilValue(user)
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
            cart:[ 
              {
                userName: userName,
                cost : totalCost,
              },
            ],

          }),

        })

        .then((response) => response.json())

        .then((order) => order.id);

      };

      const onApprove = (data) => {

        console.log(data)
         // Order is captured on the server and the response is returned to the browser

         return fetch(`${BASE_URL}/paypal/api/orders/${data.orderID}`, {

          method: "POST",

           headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            orderID: data.orderID

          })

        })

        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok, status was ${response.status} ${response.statusText}`);
          }
          return response.text().then(text => text ? JSON.parse(text) : {})
        })
        .then((data) => {
          console.log('payment successful', data);
        })
        .catch((error) => {
          console.error('There has been a problem with your fetch operation:', error);
        });
        
  };

      return (

        <PayPalButtons

          createOrder={(data, actions) => createOrder(data, actions)}

          onApprove={(data, actions) => onApprove(data, actions)}

        />

      );
}