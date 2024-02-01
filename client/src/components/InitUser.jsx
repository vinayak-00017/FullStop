import axios from "axios";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useEffect } from "react";
import { BASE_URL } from "../config";
import { adminState } from "../store/atoms/admin";

export default function InitUser(){
    const setUserLogin = useSetRecoilState(userState);
    const setAdminLogin = useSetRecoilState(adminState)

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