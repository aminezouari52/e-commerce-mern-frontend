// REACT
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// FIREBASE
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// REDUX
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "./reducers/userReducer";

// FUNCTIONS
import { currentUser } from "./functions/auth";

// COMPONENTS
import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserRoute from "./components/routes/UserRoute";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import AdminRoute from "./components/routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Product from "./pages/Product";
import CategoryHome from "./pages/category/CategoryHome";
import SubHome from "./pages/sub/SubHome";
import Checkout from "./pages/Checkout";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        try {
          const res = await currentUser(idTokenResult.token);
          dispatch(
            setLoggedInUser({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            })
          );
        } catch (err) {
          console.log(err);
        }
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  // OPTIONAL
  // TODO: handle not-found routes (example: /auth/login)

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/*" element={<UserRoute />}>
          <Route path="history" element={<History />} />
          <Route path="password" element={<Password />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        <Route path="/admin/*" element={<AdminRoute />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="category" element={<CategoryCreate />} />
          <Route path="category/:slug" element={<CategoryUpdate />} />
          <Route path="sub" element={<SubCreate />} />
          <Route path="sub/:slug" element={<SubUpdate />} />
          <Route path="product" element={<ProductCreate />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="product/:slug" element={<ProductUpdate />} />
        </Route>
        <Route exact path="/product/:slug" element={<Product />} />
        <Route exact path="/category/:slug" element={<CategoryHome />} />
        <Route exact path="/sub/:slug" element={<SubHome />} />
      </Routes>
    </>
  );
};

export default App;
