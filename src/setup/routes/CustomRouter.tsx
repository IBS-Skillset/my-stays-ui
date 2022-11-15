import { History } from 'history'
import { useLayoutEffect, useState } from 'react'
import { Router } from 'react-router-dom'

interface HistoryProps {
  history: History
  basename?: string
  children?: React.ReactNode
}

const CustomRouter = ({
  basename,
  history,
  children,
  ...props
}: HistoryProps) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  })
  useLayoutEffect(() => history.listen(setState), [history])

  return (
    <Router
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
      children={children}
      basename={basename}
    />
  )
}

export default CustomRouter
