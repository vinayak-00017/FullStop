import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ProductPage from './pages/ProductPage'
import Landing from './pages/Landing/Landing'
import { Appbar } from './components/Appbar/Appbar'
import { Box, createTheme,ThemeProvider } from '@mui/material'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import {  useSetRecoilState } from 'recoil'
import { Cart } from './pages/Shipping/Cart'
import { Order } from './pages/Shipping/Order'
import { AdminLogin } from './pages/Admin/AdminLogin'
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { useEffect } from 'react'
import { cartState } from './store/atoms/cart'
import { Footer } from './components/Footer'
import { EditProduct } from './pages/Admin/EditProduct'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { CreateProduct } from './pages/Admin/CreateProduct'
import InitUser from './components/InitUser'
import { InitProducts } from './components/InitProducts'
import { SearchResults } from './pages/SearchResults'
import { ErrorPage } from './pages/ErrorPage'
import { Shipping } from './pages/Shipping/Shipping'
import { Profile } from './pages/profile/Profile'
import { Orders } from './pages/profile/Orders'



const theme = createTheme({
  palette : {
    primary : {
      main : '#ffffff'
    },
    secondary : {
      main : '#e87121'
    }
  },
  typography:{
    fontFamily: 'Raleway,Kanit , sans-serif'
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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
    }}>
    <Router>
      <ThemeProvider theme={theme}>
        <InitUser></InitUser>
        <InitProducts></InitProducts>
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
        <Route path='/createProduct' element={<CreateProduct/>}/>
        <Route path='/order' element={<Order/>}/>
        <Route path='/search' element={<SearchResults/>}/>
        <Route path='/shipping' element={<Shipping/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path='/*' element={<ErrorPage/>} />
      </Routes>
      <ToastContainer
      position="top-right"
      className="toast-container"
      toastClassName="dark-toast"
      />
      <Footer/>
      </ThemeProvider>
    </Router>
    </Box>
 
  )
}

export default App
