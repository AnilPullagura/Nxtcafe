import {useState, useContext, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {IoIosCart} from 'react-icons/io'
import CartContext from '../CartContext'
import TabItem from '../TabItem'
import DishItem from '../DishItem'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Home = () => {
  const [apiStatus, setStatus] = useState(apiConstants.initial)
  const [tabList, setTablist] = useState([])
  const [curentTab, setTab] = useState('11')
  const {cartList, onSetItem} = useContext(CartContext)
  const count = cartList.length

  const getTabs = data => {
    const updateTab = data.map(each => ({
      tabName: each.menu_category,
      tabId: each.menu_category_id,
      categoryImage: each.menu_category_image,
      dishes: each.category_dishes.map(eachDish => ({
        availability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        calories: eachDish.dish_calories,
        currency: eachDish.dish_currency,
        discription: eachDish.dish_description,
        dishId: eachDish.dish_id,
        dishImage: eachDish.dish_image,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        addOn: eachDish.addonCat,
      })),
    }))
    return updateTab
  }

  const getApiCall = async () => {
    setStatus(apiConstants.loading)
    const url =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(url)
    try {
      if (response.ok) {
        const data = await response.json()
        const formatTabs = getTabs(data[0].table_menu_list)
        setTablist(formatTabs)
        setStatus(apiConstants.success)
        if (formatTabs.length > 0) {
          setTab(formatTabs[0].tabId)
        }
      } else {
        setStatus(apiConstants.failure)
        throw new Error('api call failed')
      }
    } catch (er) {
      console.log(er)
    }
  }

  useEffect(() => {
    getApiCall()
  }, [])

  const onsetTab = tabid => {
    setTab(tabid)
  }

  const renderLoadingView = () => (
    <div className="loader-view">
      <Loader type="Oval" height={40} width={40} color="skyblue" />
    </div>
  )

  const renderSuccessView = () => {
    const dishList = tabList.filter(each => each.tabId === curentTab)
    const {dishes} = dishList[0]
    return (
      <ul className="dish-list">
        {dishes.map(each => (
          <DishItem details={each} key={each.dishId} />
        ))}
      </ul>
    )
  }

  const renderUI = () => {
    switch (apiStatus) {
      case apiConstants.loading:
        return renderLoadingView()
      case apiConstants.success:
        return renderSuccessView()
      default:
        return null
    }
  }

  return (
    <div>
      <div className="header">
        <h1>UNI Resto Cafe</h1>
        <div className="cart-symbol">
          <p className="my-order">My Orders</p>
          <div className="cart">
            <IoIosCart className="cart-icon" />
            <p className="count">{count}</p>
          </div>
        </div>
      </div>
      <ul className="tab-list">
        {tabList.map(each => (
          <TabItem
            key={each.tabId}
            isActive={curentTab === each.tabId}
            details={each}
            onsetTab={onsetTab}
          />
        ))}
      </ul>
      {renderUI()}
    </div>
  )
}
export default Home
