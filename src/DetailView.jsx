/* eslint-disable react/prop-types */
function DetailView({ restaurant, onClose }) {
    if (!restaurant) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[500px] max-h-screen overflow-y-auto relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-2xl font-bold text-red-500 hover:text-red-700">
                    X
                </button>

                <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                <p className="text-yellow-500 mb-4">Rating: {restaurant.rating}⭐</p>

                <div className="mb-12">
                    <p className="font-semibold">Location:</p>
                    <div className="w-full h-40 bg-gray-200 mb-4">Map Placeholder</div>
                </div>

                <div className="mb-12">
                    <p className="font-semibold">Reviews:</p>
                    {restaurant.reviews.map((review, index) => (
                        <div key={index} className="flex mb-4 flex-row justify-start my-8">
                            <img src={review.img} alt={review.name} className="w-16 h-16 rounded-full mr-4" />
                            <div>
                                <p className="font-semibold">{review.name}</p>
                                <p className="text-yellow-500">{review.rating}⭐</p>
                                <p className="text-sm">{review.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex mb-4 flex-col justify-start ">
                    <p className="font-semibold">Menu:</p>
                    {restaurant.menu.map((item, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-semibold">{item.name}: </span>
                            <span>{item.price}/item</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DetailView;
