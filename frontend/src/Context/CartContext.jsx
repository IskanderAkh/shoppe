import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const clearCart = () => {
        setCart([]);
    };
    useEffect(() => {
        const cookieCart = JSON.parse(Cookies.get('cart') || '[]');
        setCart(cookieCart);
    }, []);

    useEffect(() => {
        Cookies.set('cart', JSON.stringify(cart), { expires: 5 });
    }, [cart]);

    const addToCart = (item, quantity = 1) => {
        let updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);
        if (itemIndex > -1) {
            updatedCart[itemIndex].quantity += quantity;
        } else {
            item.quantity = quantity;
            updatedCart.push(item);
        }
        setCart(updatedCart);
    };
    const incrementQuantity = (itemId) => {
        let updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(cartItem => cartItem._id === itemId);
        if (itemIndex > -1) {
            updatedCart[itemIndex].quantity += 1;
            setCart(updatedCart);
        }
    };

    const decrementQuantity = (itemId) => {
        let updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(cartItem => cartItem._id === itemId);
        if (itemIndex > -1 && updatedCart[itemIndex].quantity > 1) {
            updatedCart[itemIndex].quantity -= 1;
            setCart(updatedCart);
        }
    };
    const removeFromCart = (itemId) => {
        const updatedCart = cart.filter(item => item._id !== itemId);
        setCart(updatedCart);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
