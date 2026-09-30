import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const addToCart = (gun) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === gun.name)
      if (existing) {
        return prev.map((item) =>
          item.name === gun.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...gun, quantity: 1 }]
    })
  }

  const updateQuantity = (name, quantity) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.name !== name))
    } else {
      setCart((prev) =>
        prev.map((item) => (item.name === name ? { ...item, quantity } : item))
      )
    }
  }

  const removeFromCart = (name) => {
    setCart((prev) => prev.filter((item) => item.name !== name))
  }

  const isInCart = (name) => cart.some((item) => item.name === name)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, isInCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
