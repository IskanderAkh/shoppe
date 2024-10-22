import React, { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import CheckoutModal from '../../components/CheckoutModal/CheckoutModal';
import './cart.scss';

const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity, removeFromCart, clearCart } = useCart();
  const [isModalOpen, setModalOpen] = useState(false);

  const cartItemCount = cart.reduce((total, product) => total + product.quantity, 0);

  const handleCheckout = async (orderDetails) => {
    try {
      const response = await fetch('/api/products/buyProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cart.map(item => ({ productId: item._id, quantity: item.quantity })),
          ...orderDetails, // Include cardDetails, deliveryOption, deliveryAddress, contactNum
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order successfully processed!');
        clearCart();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };

  return (
    <div className='cart w-full'>
      <h1 className='text-center cart-title'>Shopping Cart</h1>
      <div className='flex w-full'>
        <section className='cart-main flex w-full'>
          <article className='cart-all flex-1 w-full flex flex-col gap-10 overflow-y-auto'>
            {cart.map(product => (
              <div key={product._id} className='flex max-w-xl h-32 cart-item relative w-full justify-between'>
                <div className='cart-item-img-wrapper flex gap-10 w-full'>
                  <img className='cart-item-img' src={product?.imgs.split(' ')[0]} alt='' />
                  <div className='cart-item-details'>
                    <div className='w-full'>
                      <h4>{product.name}</h4>
                      <h6>Black / Medium</h6>
                      <p>${product.price},00</p>
                    </div>
                  </div>
                </div>
                <div className='flex bg-gray-200 h-14 items-center justify-around text-center text-gray-500 gap-4 rounded-md mr-14'>
                  <button onClick={() => decrementQuantity(product._id)} className='w-full h-full px-2.5'>-</button>
                  <span className='w-full h-full text-center flex items-center justify-center'>{product.quantity}</span>
                  <button className='w-full h-full px-2.5' onClick={() => incrementQuantity(product._id)}>+</button>
                </div>
                <div className='absolute right-0 font-bold text-base cursor-pointer' onClick={() => removeFromCart(product._id)}>X</div>
              </div>
            ))}
          </article>
          <article className='flex-1'>
            <div className='cart-summary'>
              <h2>Cart Summary</h2>
              <p>Total Items: {cartItemCount}</p>
              <button
                className='btn btn-accent mt-5 btn-wide'
                onClick={() => setModalOpen(true)}
                disabled={cartItemCount === 0}
              >
                Buy
              </button>
            </div>
          </article>
        </section>
      </div>
      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCheckout}
      />
    </div>
  );
};

export default Cart;
