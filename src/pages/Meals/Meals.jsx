// === FRONTEND: Meals.jsx ===
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { MdSearch } from 'react-icons/md';
import Loading from '../../components/Loading';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import MealCard from '../../components/MealCard';

const PAGE_SIZE = 10;

const Meals = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        refetch
    } = useInfiniteQuery({
        queryKey: ['meals', searchTerm, category, priceRange],
        queryFn: async ({ pageParam = 0 }) => {
            const res = await axiosSecure.get(`/meals?page=${pageParam}&limit=${PAGE_SIZE}&search=${searchTerm}&category=${category}&priceRange=${priceRange}`);
            return res.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.hasMore ? allPages.length : false;
        }
    });

    const allMeals = data?.pages.flatMap(page => page.meals) || [];

    const handleSearch = (e) => {
        e.preventDefault();
        refetch();
    };

    return (
        <>

            <Helmet>
                <title>All Meal | HallPoint</title>
            </Helmet>

            <div className='bg-base-300'>
                <div className="max-w-7xl mx-auto px-4 py-12">

                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                            Discover Delicious Meals
                        </h1>
                        <p className="text-gray-600 text-md md:text-lg">
                            Explore a variety of cuisines, filter by taste or price, and find the perfect dish to satisfy your cravings.
                            Use the search, category filter, or scroll down to browse everything!
                        </p>
                    </div>
                    <form onSubmit={handleSearch} className="mb-6 flex flex-wrap gap-4 justify-between items-center">
                        <div className="flex items-center gap-2">
                            <MdSearch size={24} className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search meals..."
                                className="input input-bordered w-64"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select
                            className="select select-bordered"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverage">Beverage</option>
                        </select>
                        <select
                            className="select select-bordered"
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                        >
                            <option value="">All Prices</option>
                            <option value="0-3">$0 - $3</option>
                            <option value="3-6">$3 - $6</option>
                            <option value="6-10">$6 - $10</option>
                        </select>
                        <button className="btn btn-primary">Search</button>
                    </form>

                    {isLoading ? <Loading></Loading> : (
                        <InfiniteScroll
                            dataLength={allMeals.length}
                            next={fetchNextPage}
                            hasMore={hasNextPage}
                            loader={<Loading></Loading>}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                                {allMeals.map(meal => (
                                    <MealCard key={meal._id} meal={meal}></MealCard>
                                ))}
                            </div>
                        </InfiniteScroll>
                    )}
                </div>
            </div>
        </>
    );
};

export default Meals;
