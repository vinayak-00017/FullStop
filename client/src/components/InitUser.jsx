import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useEffect } from "react";
import { BASE_URL } from "../config";
import { adminState } from "../store/atoms/admin";
import { addressState } from "../store/atoms/address";

export default function InitUser(){
    const setUserLogin = useSetRecoilState(userState);
    const setAdminLogin = useSetRecoilState(adminState)
    const setAddress = useSetRecoilState(addressState)

    useEffect(() => {
    const init = async() => {
      const token = localStorage.getItem("token")
              const headers = {
                  'authentication' : token
              }
              try{
                  const response = await axios.get(`${BASE_URL}/user/me`, {
                      headers : headers
                  })
                  if(response.status == 200){
                      setUserLogin({
                        isLoading : false,
                        isUser: response.data.user.username
                      })
                      setAddress({
                        houseAddress: response.data.user.address.houseAddress,
                        city: response.data.user.address.city,
                        country: response.data.user.address.country,
                        zip: response.data.user.address.zip,
                        name: response.data.user.address.name,
                        mobileNumber: response.data.user.mobileNumber
                      })
                  }else{
                    setUserLogin({
                      isLoading : false,
                      isUser: false
                  })
                  }
              }catch(error){
                  console.error("Authentication check failed:",error);
                  localStorage.removeItem("token");
                  setUserLogin({ 
                    isLoading : false,
                    isUser: false 
                  });
              }
    }    
    const adminInit = async() => {
      const token = localStorage.getItem("adminToken")
              const headers = {
                  'authentication' : token
              }
              try{
                  const response = await axios.get(`${BASE_URL}/admin/me`, {
                      headers : headers
                  })
                  if(response.status == 200){
                      setAdminLogin({
                        isLoading : false,
                        isAdmin: response.data.admin.username
                      })
                  }else{
                    setAdminLogin({
                      isLoading : false,
                      isAdmin: false
                  })
                  }
              }catch(error){
                  console.error("Authentication check failed:",error);
                  localStorage.removeItem('adminToken')
                  setAdminLogin({ 
                    isLoading : false,
                    isAdmin: false 
                  });
              }
    }    
       init();
       adminInit();
      }, [setUserLogin,setAdminLogin]);
  
      return <></>
  }