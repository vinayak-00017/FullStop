
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import ProductPage from './components/ProductPage'
import Landing from './components/Landing'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path={'/product/:id'} element={<ProductPage/>}/>
        <Route path='/' element={<Landing/>}/>
      </Routes>
    </Router>
  )
}

export default App
