
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ProductPage from './components/ProductPage'
import Landing from './components/Landing'
import { Appbar } from './components/Appbar'
import { createTheme,ThemeProvider } from '@mui/material'


const theme = createTheme({
  palette : {
    primary : {
      main : '#ffffff'
    }
  }
})

function App() {

  return (
    <Router>
      <ThemeProvider theme={theme}>
      <Appbar/>
      <Routes>
        <Route path={'/product/:id'} element={<ProductPage/>}/>
        <Route path='/' element={<Landing/>}/>
      </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
