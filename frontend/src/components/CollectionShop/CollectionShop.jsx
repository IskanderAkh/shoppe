import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Item from '../Item/Item';
import './collection.scss';
import PriceFilter from './PriceFilter';
import SkeletonItem from '../Item/SkeletonItem';

const CollectionShop = ({ maxItems }) => {
    const [priceRange, setPriceRange] = useState([0, 300]);
    const [searchTerm, setSearchTerm] = useState('');
    const [onSale, setOnSale] = useState(false);
    const [inStock, setInStock] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    const handlePriceChange = (newRange) => {
        setPriceRange(newRange);
    };

    const { data: products, error, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch("/api/products/getall");
            const data = await res.json();
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return data;
        }
    });


    const isFiltering = searchTerm || onSale || inStock || priceRange[0] !== 40 || priceRange[1] !== 300;

    const filteredProducts = products?.filter((product) => {

        if (searchTerm && !product?.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
        }
        if (product?.price < priceRange[0] || product?.price > priceRange[1]) {
            return false;
        }
        if (onSale && !product?.onSale) {
            return false;
        }
        if (inStock && !product?.inStock) {
            return false;
        }
        return true;
    });

    const productsToDisplay = isFiltering ? filteredProducts : products;


    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className='flex max-md:flex-col'>
            <div className='collection-filters w-full '>
                <button onClick={() => setShowFilters(!showFilters)} className='items-center gap-2 text-gold text-sm mb-6 md'><img src="/filter.svg" alt="" /> Filters</button>
                <div className={`filters-container ${showFilters ? 'opened' : 'closed'}`}>
                    <form
                        className='border-b border-gray-300 pb-2 w-full flex justify-between relative'
                        onSubmit={(e) => e.preventDefault()} // Prevent default form submission
                    >
                        <input
                            type="text"
                            name="search"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full border-none outline-none bg-transparent'
                        />
                        <button type="submit"><img src="/search.svg" alt="" /></button>
                    </form>
                    <div className="collapse collapse-arrow border border-gray-300 mt-4 w-full collection-filters-input">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium collection-filters-input-title text-secondary">Sort By Bolor</div>
                        <div className="collapse-content gap-4 flex flex-col">
                            <button className='w-full text-start'>Gold</button>
                            <button className='w-full text-start'>Silver</button>
                            <button className='w-full text-start'>White</button>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow border border-gray-300 mt-4 collection-filters-input text-secondary">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium collection-filters-input-title text-secondary">Sort By</div>
                        <div className="collapse-content">
                            <p>Gold</p>
                            <p>Silver</p>
                        </div>
                    </div>
                    <PriceFilter min={0} max={300} onChange={handlePriceChange} />
                    <div className='flex flex-col mt-10 gap-10'>
                        <div className='flex items-center justify-between'>
                            <p>On sale</p>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm [--tglbg:gray] bg-white hover:bg-gray-200 rounded-xl"
                                checked={onSale}
                                onChange={(e) => setOnSale(e.target.checked)}
                            />
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>In stock</p>
                            <input
                                type="checkbox"
                                className="toggle toggle-sm [--tglbg:gray] bg-white hover:bg-gray-200 rounded-xl"
                                checked={inStock}
                                onChange={(e) => setInStock(e.target.checked)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-y-14 gap-x-4 collectiondiv justify-center items-center'>
                {
                    !isLoading && productsToDisplay?.slice(0, maxItems).map((product) => {
                        return (
                            <Item className="" key={product?._id} product={product} />
                        )
                    })
                }
                {
                    isLoading && <div>
                        <div className='grid grid-cols-3 gap-y-14 gap-x-4 collectiondiv justify-center items-center'>
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                            <SkeletonItem />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default CollectionShop;
