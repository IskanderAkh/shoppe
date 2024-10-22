import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Shop from "./pages/Shop/Shop"
import Blog from "./pages/Blog/Blog"
import About from "./pages/About/About"
import Home from "./pages/Home/Home"
import ProductPage from "./pages/Shop/ProductPage/ProductPage"
import Cart from "./pages/Cart/Cart"
import Profile from "./pages/Profile/Profile"
import Login from "./pages/Auth/Login/Login"
import Register from "./pages/Auth/Register/Register"
import Auth from "./pages/Auth/Auth"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer/Footer"
import { useLocation } from "react-router-dom"
import ShopCarousel from "./components/ShopCarousel/ShopCarousel"
function App() {
  const location = useLocation()
  return (
    <>
      <div className="container">
        <Navbar />
        {location.pathname !== "/" &&
          <div className='border-b border-gray-300 w-full'></div>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop-carousel" element={<ShopCarousel />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
        <Footer />
      </div>
      <Toaster />
    </>
  )
}

export default App
