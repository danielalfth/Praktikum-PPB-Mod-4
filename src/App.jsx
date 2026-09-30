import { useState } from 'react'
import { CartProvider } from './context/CartContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Catalog from './pages/Catalog.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Cart from './pages/Cart.jsx'
import './App.css'

function App() {
  const [tab, setTab] = useState('Catalog')

  return (
    <CartProvider>
      <div className="shell">
        <Header tab={tab} onTab={setTab} />

        <main className="main">
          {tab === 'Catalog' && <Catalog />}
          {tab === 'About' && <About />}
          {tab === 'Contact' && <Contact />}
          {tab === 'Cart' && <Cart />}
        </main>

        <Footer />
      </div>
    </CartProvider>
  )
}

export default App
