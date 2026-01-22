import {useState} from 'react'
import Home from './components/Home'
import CartContext from './components/CartContext'
import './App.css'

const App = () => {
  const [cartList, setCartItem] = useState([])

  const onSetItem = newItem => {
    setCartItem(prevState => [...prevState, newItem])
  }
  const onRemoveItem = newItem => {
    setCartItem(prevState =>
      prevState.filter(each => each.dishId !== newItem.dishId),
    )
  }
  return (
    <CartContext.Provider value={{cartList, onSetItem, onRemoveItem}}>
      <Home />
    </CartContext.Provider>
  )
}

export default App
