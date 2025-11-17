import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  quantity: number
  image: string
  category: string
  inStock: boolean
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const raw = localStorage.getItem('cart_items')
    return raw ? JSON.parse(raw) : []
  })

  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<CartItem, 'quantity'>, qty: number = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id)
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i)
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQuantity = (id: number, qty: number) => {
    if (qty < 1) return
    setItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i))
  }

  const clear = () => setItems([])

  const value = useMemo(() => ({ items, addItem, removeItem, updateQuantity, clear }), [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
