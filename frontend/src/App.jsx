
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ProductPage from './pages/ProductPage'
import Landing from './pages/Landing'
import { Appbar } from './components/Appbar'
import { createTheme,ThemeProvider } from '@mui/material'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { RecoilRoot } from 'recoil'
import { Cart } from './pages/Cart'
import { Order } from './pages/Order'


const theme = createTheme({
  palette : {
    primary : {
      main : '#ffffff'
    },
    secondary : {
      main : '#e87121'
    }
  }
})

function App() {

  return (
    <Router>
      <RecoilRoot>
      <ThemeProvider theme={theme}>
      <Appbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup></Signup>}/>
        <Route path={'/product/:id'} element={<ProductPage/>}/>
        <Route path='/' element={<Landing/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<Order/>}/>
      </Routes>
      </ThemeProvider>
      </RecoilRoot>
    </Router>
 
  )
}

export default App
