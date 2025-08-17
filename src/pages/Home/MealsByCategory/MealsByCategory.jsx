import { useState, useEffect } from 'react';
import { FaStar, FaUtensils, FaCoffee, FaHamburger, FaMoon } from 'react-icons/fa';
import MealCard from '../../../components/MealCard';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router';
import SectionTitle from '../../../components/SectionTitle';

// Mock data for demonstration


const tabs = [
    { name: 'All', icon: FaUtensils },
    { name: 'Breakfast', icon: FaCoffee },
    { name: 'Lunch', icon: FaHamburger },
    { name: 'Dinner', icon: FaMoon }
];



const MealsByCategory = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [meals, setMeals] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchMeals = async () => {
            const res = await axiosSecure.get('/meals/all');
            const allMeals = res.data;
            const filtered = activeTab === 'All' ? allMeals : allMeals.filter(m => m.category === activeTab);
            setMeals(filtered.slice(0, 3)); // only 3 meals per category
        };
        fetchMeals();
    }, [activeTab, axiosSecure]);

    const getTabIcon = (tabName) => {
        const tab = tabs.find(t => t.name === tabName);
        return tab ? tab.icon : FaUtensils;
    };

    return (
        <div className='bg-gradient-to-br from-base-200 via-base-300 to-base-200 relative overflow-hidden'>
            {/* Decorative background elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-20 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto py-20 px-4 relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                        <FaUtensils className="w-8 h-8 text-primary" />
                    </div>
                    <SectionTitle title={'Our Signature Meals'} subTitle={'Discover our carefully crafted culinary masterpieces, each dish prepared with the finest ingredients and presented with artistic flair. From morning delights to evening indulgences.'}></SectionTitle>


                </div>

                {/* Enhanced Tab Navigation */}
                <div className="flex justify-center mb-16">
                    <div className="tabs tabs-boxed bg-base-100 shadow-lg p-2 rounded-2xl border border-base-300">
                        {tabs.map((tab, index) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveTab(tab.name)}
                                    className={`tab tab-lg gap-2 transition-all duration-300 rounded-xl font-semibold ${activeTab === tab.name
                                        ? 'tab-active bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform scale-105'
                                        : 'text-base-content/70 hover:text-primary hover:bg-base-200'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {tab.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Meal Cards Grid */}
                <div className="mb-12">
                    {meals.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {meals.map(meal => (
                                <MealCard key={meal._id} meal={meal} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-24 h-24 bg-base-200 rounded-full mb-6">
                                <FaUtensils className="w-12 h-12 text-base-content/30" />
                            </div>
                            <h3 className="text-2xl font-bold text-base-content/60 mb-2">No Meals Available</h3>
                            <p className="text-base-content/50">We're cooking up something special for this category!</p>
                        </div>
                    )}
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 max-w-2xl mx-auto">
                        <div className="card-body text-center py-12">
                            <h3 className="text-3xl font-bold text-base-content mb-4">
                                Craving for More?
                            </h3>
                            <p className="text-base-content/70 mb-6">
                                Explore our complete menu with over 50+ delicious dishes crafted by our expert chefs.
                            </p>
                            <Link to={'/meals'} className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
                                <FaUtensils className="w-5 h-5" />
                                View Full Menu
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealsByCategory;