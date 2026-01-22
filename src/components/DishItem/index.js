import {useState, useContext} from 'react'
import CartContext from '../CartContext'

import './index.css'
const DishItem = props => {
  const [count, setCount] = useState(0)
  const {onSetItem, onRemoveItem} = useContext(CartContext)
  const {details} = props
  const {
    availability,
    dishType,
    calories,
    currency,
    discription,
    dishId,
    dishImage,
    dishName,
    dishPrice,
    addOn,
  } = details

  const addItem = () => {
    onSetItem(details)
    setCount(prevState => prevState + 1)
  }

  const removeItem = () => {
    onRemoveItem(details)
    if (count > 0) {
      setCount(prev => prev - 1)
    } else {
      setCount(0)
    }
  }

  const renderAddCart = () => (
    <div className="cart-box">
      <button onClick={removeItem} className="remove" type="button">
        -
      </button>
      <p>{count}</p>
      <button onClick={addItem} className="add" type="button">
        +
      </button>
    </div>
  )
  return (
    <li className="item">
      <div className="dish-item">
        <div className="name-box">
          <h1 className="name">{dishName}</h1>
          <p className="sar">
            {currency} {dishPrice}
          </p>
          <p className="discription">{discription}</p>
          {availability ? (
            renderAddCart()
          ) : (
            <p className="not-available">Not Available</p>
          )}
          {addOn.length > 0 ? (
            <p className="custom">Customizations available</p>
          ) : (
            ''
          )}
        </div>
        <div className="calories-box">
          <p className="calories">{calories} calories</p>
        </div>
        <div className="image-box">
          <img className="dish-image" src={dishImage} alt="dish item" />
        </div>
      </div>
    </li>
  )
}
export default DishItem
