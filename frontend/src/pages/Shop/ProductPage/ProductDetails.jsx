import React from 'react';
import StarRate from '../../../components/StarRate/StarRate';

const ProductDetails = ({ product, count, increment, decrement, handleAddToCart }) => {
    return (
        <div className='flex-1 w-full '>
            <div className='product-details'>
                <h2 className='text-3xl product-details-name'>{product?.name}</h2>
                {product?.inStock !== false ?
                    <p className='mt-6 product-price mb-16 '> $ {product?.price},00</p>
                    :
                    <p className='mt-6 product-price mb-16'>Out of Stock</p>
                }
                <StarRate />
                <article className='w-8/12 mt-5 text-gray-500 max-xl:w-full'>
                    <p>{product?.overview}</p>
                </article>
                <div className='flex max-w-lg w-full gap-6 mt-12'>
                    <div className='flex bg-gray-200 h-14 items-center justify-around text-center text-gray-500 px-3 gap-6 rounded-md'>
                        <button onClick={decrement} className='w-full h-full'>-</button>
                        <span className='w-full h-full text-center flex items-center justify-center '>{count}</span>
                        <button className='w-full h-full' onClick={increment}>+</button>
                    </div>
                    {/* <button
                        className='uppercase w-11/12 h-14 border-black border rounded text-black font-bold hover:bg-black hover:text-white transition-all duration-500'
                        onClick={() => handleAddToCart(product, count)}
                        type="button"
                        disabled={product?.inStock == false}
                        data-toggle="collapse"
                        data-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                    >
                        Add to cart
                    </button> */}
                    <button
                        className='uppercase w-3/4 h-14 btn btn-neutral btn-outline'
                        onClick={() => handleAddToCart(product, count)}
                        type="button"
                        disabled={product?.inStock == false}
                        data-toggle="collapse"
                        data-target="#collapseExample"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                    >
                        Add to cart
                    </button>
                </div>

                <div className='flex gap-10 items-center max-w-60 mt-20'>
                    <div><img src="/GrayHeart.svg" alt="" className='cursor-pointer' /></div>
                    <div className='border-l border-gray-200 h-5'></div>
                    <div className='flex gap-6'>
                        <img className='cursor-pointer' src="/mail.svg" alt="" />
                        <img className='cursor-pointer' src="/face.svg" alt="" />
                        <img className='cursor-pointer' src="/inst.svg" alt="" />
                        <img className='cursor-pointer' src="/twit.svg" alt="" />
                    </div>
                </div>

                <div className='flex gap-4 mb-4 mt-9'>
                    SKU: <p className='text-gray-500'>{product?.SKU}</p>
                </div>
                <div className='flex gap-4'>
                    Categories: <p className='text-gray-500'>{product?.categories}</p>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;
