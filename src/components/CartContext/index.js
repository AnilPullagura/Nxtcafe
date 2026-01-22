import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  setCartItem: () => {},
  onRemoveItem: () => {},
})
export default CartContext
