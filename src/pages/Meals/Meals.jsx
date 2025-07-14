// === FRONTEND: Meals.jsx ===
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { MdSearch } from 'react-icons/md';
import Loading from '../../components/Loading';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';

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
                                    <div
                                        key={meal._id}
                                        className="group bg-white border border-gray-100 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative"
                                    >
                                        {/* Image with overlays */}
                                        <div className="relative">
                                            <img
                                                src={meal.image}
                                                alt={meal.title}
                                                className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                                            />

                                            {/* Cuisine tag */}
                                            <span className="absolute top-4 left-4 bg-secondary text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-md tracking-wide uppercase">
                                                {meal.cuisine}
                                            </span>

                                            {/* Price tag */}
                                            <span className="absolute bottom-4 right-4 bg-white text-primary font-extrabold px-4 py-1 text-sm rounded-xl shadow border border-primary">
                                                ${meal.price}
                                            </span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-5 space-y-3">
                                            {/* Title */}
                                            <h2 className="text-xl font-bold text-gray-800 group-hover:text-primary transition duration-200 line-clamp-1">
                                                {meal.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                                {meal.description}
                                            </p>

                                            {/* Ingredients */}
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                {meal.ingredients.slice(0, 4).map((ing, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary font-medium px-3 py-1 rounded-full border border-primary/30 shadow-sm"
                                                    >
                                                        {ing}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Rating and CTA */}
                                            <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
                                                {/* Rating */}
                                                <div className="flex items-center gap-[2px] text-yellow-500 text-sm font-semibold">
                                                    {Array(5)
                                                        .fill()
                                                        .map((_, i) => (
                                                            <span key={i}>{i < Math.round(meal.rating) ? '★' : '☆'}</span>
                                                        ))}
                                                    <span className="text-gray-400 ml-2 text-xs font-normal">({meal.rating.toFixed(1)})</span>
                                                </div>

                                                {/* Details Button */}
                                                <Link
                                                    to={`/meal-details/${meal._id}`}
                                                    className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white rounded-full px-4 shadow-lg hover:scale-105 transition-transform"
                                                >
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>
                                    </div>



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
