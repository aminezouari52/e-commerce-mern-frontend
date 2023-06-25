// REACT
import { Outlet } from 'react-router-dom'

// REDUX
import { useSelector } from 'react-redux'

// COMPONENTS
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = () => {
  const user = useSelector((state) => state.user.loggedInUser)

  return user && user.token ? <Outlet /> : <LoadingToRedirect />
}

export default UserRoute
