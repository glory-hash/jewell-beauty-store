import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductsProvider from './contexts/ProductsContext'
import CartProvider from './contexts/CartContext'
import FavoritesProvider from './contexts/FavoritesContext'
import AuthProvider from './contexts/AuthContext'

// Pages
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'
import About from './pages/About'
import Contact from './pages/Contact'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifySent from './pages/VerifySent'
import VerifyEmail from './pages/VerifyEmail'
import ResetSent from './pages/ResetSent'
import Profile from './pages/Profile'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <FavoritesProvider>
              <div className="min-h-screen bg-luxury-cream-light flex flex-col">
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/catalog" element={<Catalog />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/reset-sent" element={<ResetSent />} />
                  <Route path="/verify-sent" element={<VerifySent />} />
                  <Route path="/verify" element={<VerifyEmail />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
                <Footer />
              </div>
            </FavoritesProvider>
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
