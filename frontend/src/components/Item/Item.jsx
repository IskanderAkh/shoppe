import React from 'react'
import { Link } from 'react-router-dom'
import './item.scss'
import { useCart } from '../../Context/CartContext'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'
const Item = ({ product }) => {

    const id = product?._id
    const { cart, addToCart, removeFromCart } = useCart();
    const { data: authUser, isLoading, isError } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await axios.get('/api/auth/me')
                const response = res.data
                return response
            } catch (error) {
                console.log(error);
            }
        }
    })

    const handleAddToCart = (product) => {
        if (authUser) {
            addToCart(product);
        } else {
            toast.error('You need to login first!', {
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            });
        }
    }

    const imgs = product?.imgs.split(' ')
    return (
        <div className='item cursor-pointer'>
            <div className='relative item-img-container'>
                <img className='item-img rounded-lg' src={imgs[0]} alt="" />
                <div className='item-img-overlay absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 flex justify-center items-center gap-7 '>
                    <button onClick={() => handleAddToCart(product)} className='outline-none'>
                        <img src="/shopping-cart.svg" alt="" />
                    </button>
                    <Link to={`/shop/${id}`}>
                        <img src="/eye.svg" alt="" />
                    </Link>
                    <button className='outline-none'>
                        <img src="/heart.svg" alt="" />
                    </button>
                </div>
            </div>
            <div className='item-text'>
                <h4 className='item-text-name'>{product?.name}</h4>
                {product?.inStock !== false ?
                    <h4 className='item-text-price '> $ {product?.price},00</h4>
                    :
                    <h4 className='item-text-price'>Sold out</h4>
                }
            </div>
        </div>
    )
}

export default Item