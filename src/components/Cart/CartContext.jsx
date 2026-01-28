import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, options) => {
        setCartItems((prevItems) => {
            // Check if same product with same options exists
            const existingItemIndex = prevItems.findIndex(
                (item) => item.id === product.id &&
                    JSON.stringify(item.options) === JSON.stringify(options)
            );

            if (existingItemIndex > -1) {
                // Update quantity
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += options.quantity;
                return newItems;
            } else {
                // Add new item
                return [...prevItems, { ...product, options, quantity: options.quantity }];
            }
        });
    };

    const removeFromCart = (index) => {
        setCartItems((prevItems) => {
            const newItems = [...prevItems];
            newItems.splice(index, 1);
            return newItems;
        });
    };

    const updateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems((prevItems) => {
            const newItems = [...prevItems];
            newItems[index].quantity = newQuantity;
            return newItems;
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = useMemo(() => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cartItems]);

    const cartCount = useMemo(() => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    }, [cartItems]);

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};
