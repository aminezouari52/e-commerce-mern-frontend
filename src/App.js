// REACT
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

// FIREBASE
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

// REDUX
import { useDispatch } from 'react-redux'
import { setLoggedInUser } from './reducers/userReducer'

// FUNCTIONS
import { currentUser } from './functions/auth'

// COMPONENTS
import Header from './components/nav/Header'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import UserRoute from './components/routes/UserRoute'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreate'
import SubUpdate from './pages/admin/sub/SubUpdate'
import ProductCreate from './pages/admin/product/ProductCreate'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()
        try {
          const res = await currentUser(idTokenResult.token)
          dispatch(
            setLoggedInUser({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            })
          )
        } catch (err) {
          console.log(err)
        }
      }
    })
    // cleanup
    return () => unsubscribe()
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/*" element={<UserRoute />}>
          <Route path="history" element={<History />} />
          <Route path="password" element={<Password />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/admin/*" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="category" element={<CategoryCreate />} />
          <Route path="category/:slug" element={<CategoryUpdate />} />
          <Route path="sub" element={<SubCreate />} />
          <Route path="sub/:slug" element={<SubUpdate />} />
          <Route path="product" element={<ProductCreate />} />
        </Route>
      </Routes>
    </>
  )
}

export default App