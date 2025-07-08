// === FRONTEND: Meals.jsx ===
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { MdSearch } from 'react-icons/md';
import Loading from '../../components/Loading';

const PAGE_SIZE = 6;

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
        <div className="max-w-7xl mx-auto px-4 py-8">
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
                    loader={<p className="text-center">Loading more...</p>}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allMeals.map(meal => (
                            <div
                                key={meal._id}
                                className="bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                {/* Image with cuisine tag */}
                                <div className="relative">
                                    <img
                                        src={meal.image}
                                        alt={meal.title}
                                        className="w-full h-56 object-cover"
                                    />
                                    <span className="absolute top-3 left-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                        {meal.cuisine}
                                    </span>
                                    <span className="absolute bottom-3 right-3 bg-base-100 text-primary font-bold px-3 py-1 text-sm rounded-md shadow border border-primary">
                                        ${meal.price}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-4 space-y-2">
                                    <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                                        {meal.title}
                                    </h2>
                                    <p className="text-sm text-gray-500 line-clamp-2">
                                        {meal.description}
                                    </p>

                                    {/* Ingredients */}
                                    <div className="flex flex-wrap gap-2 text-xs">
                                        {meal.ingredients.slice(0, 3).map((ing, idx) => (
                                            <span
                                                key={idx}
                                                className="bg-secondary/10 text-secondary px-2 py-1 rounded-full border border-secondary/60"
                                            >
                                                {ing}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Rating and Details */}
                                    <div className="flex justify-between items-center pt-3 border-t border-slate-400 mt-2">
                                        <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                                            {Array(5)
                                                .fill()
                                                .map((_, i) => (
                                                    <span key={i}>{i < meal.rating ? '★' : '☆'}</span>
                                                ))}
                                            <span className="text-gray-500 ml-1 text-xs">({meal.rating})</span>
                                        </div>

                                        <button
                                            className="btn btn-sm btn-primary px-4"
                                            onClick={() => navigate(`/meal/${meal._id}`)}
                                        >
                                            Details
                                        </button>
                                    </div>
                                </div>
                            </div>


                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default Meals;
