import React from 'react'

type Props = {
  id: string
  activeTab: string
  children: React.ReactNode
}

const TabContent = ({ id, activeTab, children }: Props) => {
  return activeTab === id ? <div className="tab-content">{children}</div> : null
}

export default TabContent
