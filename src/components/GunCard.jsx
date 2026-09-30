import { useRef } from 'react'
import { useCart } from '../context/CartContext.jsx'

function GunCard({ gun }) {
  const popup = useRef(null)
  const { addToCart, isInCart } = useCart()

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(gun)
  }

  return (
    <li className="card">
      <button
        className={`cart-icon-btn ${isInCart(gun.name) ? 'in-cart' : ''}`}
        onClick={handleAddToCart}
        title="Add to cart"
      >
        🛒
      </button>
      
      <button className="card-btn" onClick={() => popup.current.showModal()}>
        <img className="card-img" src={gun.image} alt="" width="120" height="90" />
        <span className="name display">{gun.name}</span>
        <span className="type">
          {gun.type} · {gun.caliber}
        </span>
        <span className="price">${gun.price.toLocaleString()}</span>
      </button>

      <dialog
        className="popup"
        ref={popup}
        onClick={(e) => e.target === popup.current && popup.current.close()}
      >
        <img className="popup-img" src={gun.image} alt="" width="240" height="180" />
        <h3 className="display">{gun.name}</h3>
        <p className="type">
          {gun.type} · {gun.caliber} · <span className="price">${gun.price.toLocaleString()}</span>
        </p>
        <p>{gun.description}</p>
        <form method="dialog">
          <button className="popup-close">Close</button>
        </form>
      </dialog>
    </li>
  )
}

export default GunCard