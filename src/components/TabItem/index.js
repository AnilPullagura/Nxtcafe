import './index.css'

const TabItem = props => {
  const {details, isActive, onsetTab} = props

  const {tabName, tabId} = details
  const activeTab = isActive ? 'active' : ''
  const onset = () => {
    onsetTab(tabId)
  }
  return (
    <li>
      <button className={`${activeTab} tab-item tab-name`} onClick={onset}>
        {tabName}
      </button>
    </li>
  )
}
export default TabItem
