// HOOKS
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// FIREBASE
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// FUNCTIONS
import { setLoggedInUser } from "./reducers/userReducer";
import { currentUser } from "./functions/auth";

// COMPONENTS
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/nav/Header";
import AdminRoute from "./components/routes/AdminRoute";
import UserRoute from "./components/routes/UserRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Product from "./pages/Product";
import SubHome from "./pages/sub/SubHome";
import CategoryHome from "./pages/category/CategoryHome";
import History from "./pages/user/History";
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CategoryCreate from "./pages/admin/category/CategoryCreate";
import CategoryUpdate from "./pages/admin/category/CategoryUpdate";
import SubCreate from "./pages/admin/sub/SubCreate";
import SubUpdate from "./pages/admin/sub/SubUpdate";
import ProductCreate from "./pages/admin/product/ProductCreate";
import AllProducts from "./pages/admin/product/AllProducts";
import ProductUpdate from "./pages/admin/product/ProductUpdate";
import Wishlist from "./pages/user/Wishlist";
import NotFound from "./components/NotFound";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

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

  // TODO: make sure this works
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        toast({
          title: "Session expired.",
          status: "warning",
          colorScheme: "red",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }
    });
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/*" element={<UserRoute />}>
          <Route path="history" element={<History />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="password" element={<Password />} />
          <Route path="*" element={<Navigate to="/user/history" />} />
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
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>
        <Route exact path="/product/:slug" element={<Product />} />
        <Route exact path="/category/:slug" element={<CategoryHome />} />
        <Route exact path="/sub/:slug" element={<SubHome />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
