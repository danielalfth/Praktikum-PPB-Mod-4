import { useCart } from '../context/CartContext.jsx'

const NAV = ['Catalog', 'About', 'Contact']

function Header({ tab, onTab }) {
  const { totalItems } = useCart()

  return (
    <header className="header">
      <span className="brand display">Kelompok 24</span>
      <nav className="nav">
        {NAV.map((item) => (
          <button
            key={item}
            type="button"
            className={tab === item ? 'nav-link active' : 'nav-link'}
            onClick={() => onTab(item)}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          className={tab === 'Cart' ? 'nav-link cart-link active' : 'nav-link cart-link'}
          onClick={() => onTab('Cart')}
        >
          Cart
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </button>
      </nav>
    </header>
  )
}

export default Header