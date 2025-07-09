import { useState, useEffect } from 'react';
import { FaStar, FaUtensils } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const tabs = ['All', 'Breakfast', 'Lunch', 'Dinner'];

const MealsByCategory = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [meals, setMeals] = useState([]);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeals = async () => {
            const res = await axiosSecure.get('/meals/all');
            const allMeals = res.data;
            const filtered = activeTab === 'All' ? allMeals : allMeals.filter(m => m.category === activeTab);
            setMeals(filtered.slice(0, 3)); // only 3 meals per category
        };
        fetchMeals();
    }, [activeTab, axiosSecure]);

    return (
        <div className="max-w-7xl mx-auto py-16 px-4">
            <h2 className="text-4xl font-bold text-center text-primary mb-2">Our Meals</h2>
            <p className="text-center text-gray-500 max-w-xl mx-auto mb-8">
                Explore delicious dishes by category. Select a tab to discover our curated meals.
            </p>

            {/* Enhanced Tabs */}
            <div className="flex justify-center mb-12 relative">
                <div className="relative inline-flex rounded-full bg-gray-100 p-1 shadow-inner">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveTab(tab)}
                            className={`relative flex items-center justify-center px-6 py-2 text-sm font-medium transition-all duration-300 rounded-full z-10 ${activeTab === tab
                                ? 'text-white bg-gradient-to-r from-primary to-secondary shadow-lg'
                                : 'text-gray-600 hover:text-primary'
                                }`}
                            style={{ minWidth: '100px' }}
                        >
                            {tab}
                        </button>
                    ))}
                    {/* Animated background for active tab (optional) */}
                    <div
                        className="absolute inset-0 flex items-center pointer-events-none"
                        style={{
                            transform: `translateX(${tabs.indexOf(activeTab) * 100}%)`,
                            transition: 'transform 0.3s ease-in-out',
                            width: `${100 / tabs.length}%`
                        }}
                    >
                        <div className="h-full w-full rounded-full border-2 border-white/30"></div>
                    </div>
                </div>
            </div>

            {/* Meal Cards */}
            <div className="grid md:grid-cols-3 gap-8">
                {meals.length > 0 ? meals.map(meal => (
                    <div
                        key={meal._id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 group"
                    >
                        <div className="relative">
                            <img
                                src={meal.image}
                                alt={meal.title}
                                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                {meal.category}
                            </div>
                        </div>
                        <div className="p-5 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-800">{meal.title}</h3>
                                <span className="text-primary font-bold text-md">${meal.price}</span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={i < meal.rating ? 'text-yellow-400' : 'text-gray-300'}
                                    />
                                ))}
                                <span className="text-gray-500 ml-1">({meal.rating})</span>
                            </div>

                            {/* Ingredients Preview */}
                            <div className="flex flex-wrap gap-2 text-xs text-white">
                                {meal.ingredients.slice(0, 2).map((ing, idx) => (
                                    <span key={idx} className="bg-secondary text-white px-2 py-1 rounded-full">
                                        {ing}
                                    </span>
                                ))}
                            </div>

                            {/* Details Button */}
                            <Link
                                to={`/meal-details/${meal._id}`}
                                className="mt-4 btn btn-outline btn-sm w-full rounded-full"
                            >
                                <FaUtensils className="mr-2" /> View Details
                            </Link>
                        </div>
                    </div>
                )) : (
                    <p className="text-center col-span-3 text-gray-500">No meals available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default MealsByCategory;