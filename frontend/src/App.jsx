
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ProductPage from './pages/ProductPage'
import Landing from './pages/Landing'
import { Appbar } from './components/Appbar'
import { createTheme,ThemeProvider } from '@mui/material'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import { Cart } from './pages/Cart'
import { Order } from './pages/Order'
import { AdminLogin } from './pages/Admin/AdminLogin'
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { useEffect } from 'react'
import { cartState } from './store/atoms/cart'
import { BASE_URL } from './config'
import axios from 'axios'
import { userState } from './store/atoms/user'
import { Footer } from './components/Footer'
import { EditProduct } from './pages/Admin/EditProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const theme = createTheme({
  palette : {
    primary : {
      main : '#ffffff'
    },
    secondary : {
      main : '#e87121'
    }
  },

  components:{
    MuiButton : {
      defaultProps : {
        color : 'secondary'
      },
      styleOverrides : {
        root : {
          borderRadius : '10rem'
        }
      }
    }
  }
})

function App() {

  const setCart = useSetRecoilState(cartState)

  useEffect(()=>{
    const savedCart = localStorage.getItem('cart');
    
    if(savedCart){
      setCart(JSON.parse(savedCart))
    }
  })

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <InitUser></InitUser>
      <Appbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup></Signup>}/>
        <Route path={'/product/:id'} element={<ProductPage/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        <Route path='/editProduct/:id' element={<EditProduct/>}/>
      </Routes>
      <ToastContainer/>
      <Footer/>
      </ThemeProvider>
    </Router>
 
  )
}

function InitUser(){
  const setUserLogin = useSetRecoilState(userState);

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
                      isUser: response.data.username
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
     init();
    }, [setUserLogin]);

    return <></>
}

export default App
