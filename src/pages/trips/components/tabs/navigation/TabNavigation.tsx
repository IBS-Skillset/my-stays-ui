import { Dispatch } from 'react'

type Props = {
  id: string
  title: string
  activeTab: string
  setActiveTab: Dispatch<string>
}

const TabNavigation = ({ id, title, activeTab, setActiveTab }: Props) => {
  const handleClick = () => {
    setActiveTab(id)
  }

  return (
    <li className={activeTab === id ? 'active-trips' : 'trips'}>
      <button onClick={handleClick}>{title}</button>
    </li>
  )
}

export default TabNavigation
