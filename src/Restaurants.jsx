/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import DetailView from "./DetailView";

function RestaurantCard({ restaurant, onClick }) {
    return (
        <div className="border rounded-lg shadow-md p-4 m-4 w-64 cursor-pointer">
            <img src={restaurant.img} alt={restaurant.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-semibold">{restaurant.name}</h2>
            <p className="text-yellow-500 mb-2">Rating: {restaurant.rating}⭐</p>
            <div className="flex flex-row justify-between">
                <p className="text-gray-800 mb-2">Price: {restaurant.price}</p>
                <p className={`text-sm mb-4 ${restaurant.isOpen ? "text-green-500" : "text-red-500"}`}>
                    {restaurant.isOpen ? "Open" : "Closed"}
                </p>
            </div>
            <button
                onClick={() => onClick(restaurant)}
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Show Details
            </button>
        </div>
    );
}

function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [filters, setFilters] = useState({
        category: "",
        price: "",
        isOpen: "",
    });

    useEffect(() => {
        axios
            .get("https://67904a1e49875e5a1a94cf71.mockapi.io/api/v1/restaurants")
            .then((response) => {
                setRestaurants(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the restaurants!", error);
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesCategory = filters.category ? restaurant.category === filters.category : true;
        const matchesPrice = filters.price ? restaurant.price === filters.price : true;
        const matchesIsOpen = filters.isOpen ? restaurant.isOpen === (filters.isOpen === "open") : true;
        return matchesCategory && matchesPrice && matchesIsOpen;
    });

    const handleCardClick = (restaurant) => {
        setSelectedRestaurant(restaurant);
    };

    const handleCloseModal = () => {
        setSelectedRestaurant(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <h1 className="text-6xl font-semibold">Restaurants</h1>
            <div className="text-xl my-5">Jelajahi Berbagai Restoran</div>

            <div className="filter mb-5">
                <span>Filter by:</span>
                <span className="category mx-4">
                    <span>Country:</span>
                    <select name="category" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="Indonesia">Indonesia</option>
                        <option value="Japan">Japan</option>
                        <option value="USA">USA</option>
                    </select>
                </span>

                <span className="price mx-4">
                    <span>Price:</span>
                    <select name="price" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="Cheap">Cheap</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Expensive">Expensive</option>
                    </select>
                </span>

                <span className="isOpen mx-4">
                    <span>Status:</span>
                    <select name="isOpen" onChange={handleFilterChange}>
                        <option value="">All</option>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </span>
            </div>

            <div className="flex flex-wrap justify-center">
                {filteredRestaurants.length === 0 ? (
                    <p>No restaurants found.</p>
                ) : (
                    filteredRestaurants.map((restaurant) => (
                        <RestaurantCard key={restaurant.id} restaurant={restaurant} onClick={handleCardClick} />
                    ))
                )}
            </div>

            <DetailView restaurant={selectedRestaurant} onClose={handleCloseModal} />
        </>
    );
}

export default Restaurants;
