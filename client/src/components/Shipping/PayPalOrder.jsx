import { PayPalButtons } from "@paypal/react-paypal-js";
import { BASE_URL } from "../../config";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartTotalPrice } from "../../store/selectors/cartTotalPrice";
import { user } from "../../store/selectors/user";
import { cart } from "../../store/selectors/cart";
import { addressState } from "../../store/atoms/address";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { cartState } from "../../store/atoms/cart";

export const PayPalOrder = () => {
    
  const totalCost = useRecoilValue(cartTotalPrice)
  const userName = useRecoilValue(user)
  const address = useRecoilValue(addressState)
  const navigate = useNavigate()
  const setCart = useSetRecoilState(cartState)
  const sCart = useRecoilValue(cart).map((item)=>({                
    id : item.item._id,
    quantity : item.quantity,
    size : item.size           
}))

    const createOrder = (data, actions) => {


        // Order is created on the server and the order id is returned

        return fetch(`${BASE_URL}/paypal/api/orders`, {

          method: "POST",

           headers: {

            "Content-Type": "application/json",

          },

          // use the "body" param to optionally pass additional order information

          // like product skus and quantities

          body: JSON.stringify({
            cart:
              {
                userName: userName,
                cost : totalCost,
                cart : sCart,
                address,
              },
            

          }),

        })

        .then((response) => response.json())

        .then((order) => order.id);

      };

      const onApprove = (data, actions) => {

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
          setCart([])
          localStorage.removeItem('cart')
          toast.success('order placed')
          navigate('/')
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