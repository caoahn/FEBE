import TopTotal from "../components/home/Total";
import LatestOrder from "../components/home/LatestOrder";
function HomePage() {

    const orders = [
        {
            shippingAddress: {
                address: "ha noi",
                city: "ha noi",
                postalCode: "10020",
                country: "vietnam"
            },
            _id: "67b9df15af145f96d59ce0b4",
            user: {
                _id: "67b08e408b5f80f9140a6b4e",
                name: "canhhh",
                email: "caotanh04@gmail.com"
            },
            orderItems: [
                {
                    name: "lalal",
                    qty: 1,
                    image: {
                        public_id: "ShoeShop/imm2c5r6axlcftvg7zud",
                        url: "https://res.cloudinary.com/djrnau5bl/image/upload/v1739625528/ShoeShop/imm2c5r6axlcftvg7zud.jpg"
                    },
                    price: 123,
                    product: "67b0943b8b5f80f9140a6bec",
                    _id: "67b9df15af145f96d59ce0b5"
                }
            ],
            paymentMethod: "Paypal",
            taxPrice: 12.3,
            shippingPrice: 10,
            totalPrice: 145.3,
            isPaid: false,
            isDelivered: false,
            createdAt: "2025-02-22T14:28:37.788Z",
            updatedAt: "2025-02-22T14:28:37.788Z",
            __v: 0
        },
        {
            shippingAddress: {
                address: "ha noi",
                city: "ha noi",
                postalCode: "10020",
                country: "vietnam"
            },
            _id: "67b9df15af145f96d59ce0b4",
            user: {
                _id: "67b08e408b5f80f9140a6b4e",
                name: "canhhh",
                email: "caotanh04@gmail.com"
            },
            orderItems: [
                {
                    name: "lalal",
                    qty: 1,
                    image: {
                        public_id: "ShoeShop/imm2c5r6axlcftvg7zud",
                        url: "https://res.cloudinary.com/djrnau5bl/image/upload/v1739625528/ShoeShop/imm2c5r6axlcftvg7zud.jpg"
                    },
                    price: 123,
                    product: "67b0943b8b5f80f9140a6bec",
                    _id: "67b9df15af145f96d59ce0b5"
                }
            ],
            paymentMethod: "Paypal",
            taxPrice: 12.3,
            shippingPrice: 10,
            totalPrice: 145.3,
            isPaid: false,
            isDelivered: false,
            createdAt: "2025-02-22T14:28:37.788Z",
            updatedAt: "2025-02-22T14:28:37.788Z",
            __v: 0
        },
        {
            shippingAddress: {
                address: "ha noi",
                city: "ha noi",
                postalCode: "10020",
                country: "vietnam"
            },
            _id: "67b9df15af145f96d59ce0b4",
            user: {
                _id: "67b08e408b5f80f9140a6b4e",
                name: "canhhh",
                email: "caotanh04@gmail.com"
            },
            orderItems: [
                {
                    name: "lalal",
                    qty: 1,
                    image: {
                        public_id: "ShoeShop/imm2c5r6axlcftvg7zud",
                        url: "https://res.cloudinary.com/djrnau5bl/image/upload/v1739625528/ShoeShop/imm2c5r6axlcftvg7zud.jpg"
                    },
                    price: 123,
                    product: "67b0943b8b5f80f9140a6bec",
                    _id: "67b9df15af145f96d59ce0b5"
                }
            ],
            paymentMethod: "Paypal",
            taxPrice: 12.3,
            shippingPrice: 10,
            totalPrice: 145.3,
            isPaid: false,
            isDelivered: false,
            createdAt: "2025-02-22T14:28:37.788Z",
            updatedAt: "2025-02-22T14:28:37.788Z",
            __v: 0
        }
    ]

    const products = [
        {
            _id: "67c3103a7c22dd4dba5b3ee6",
            name: "sản phẩm 2",
            image: {
                public_id: "ShoeShop/m7hh6vq60xcgbbasmudt",
                url: "https://res.cloudinary.com/djrnau5bl/image/upload/v1740836921/ShoeShop/m7hh6vq60xcgbbasmudt.jpg"
            },
            description: "heheh",
            rating: 0,
            numReviews: 0,
            category: "67b091fe8b5f80f9140a6b86",
            price: 23,
            countInStock: 23,
            reviews: [],
            createdAt: "2025-03-01T13:48:42.605Z",
            updatedAt: "2025-03-01T13:48:42.605Z",
            __v: 0
        },
        
    ]
    return (
        <div className="">
            <section className="px-[3%] py-[30px] mx-auto">
                <div className="flex items-center justify-between mb-[30px]">
                    <h2 className="text-3xl font-semibold">
                        Dashboard
                    </h2>
                </div>

                <TopTotal orders={orders} products={products} />

                <div className="flex flex-row mt-5 gap-x-10">
                    <div className="xl:col-span-6 lg:col-span-12 w-[50%]">
                        <div className="bg-white shadow-md rounded-lg mb-4 boder">
                            <article className="p-6">
                                <h5 className="text-lg font-semibold text-gray-800">Sale Statistics</h5>
                            </article>
                        </div>
                    </div>
                    <div className="xl:col-span-6 lg:col-span-12 w-[50%]">
                        <div className="bg-white shadow-md rounded-lg mb-4 boder">
                            <article className="p-6 ">
                                <h5 className="text-lg font-semibold text-gray-800">Products Statistics</h5>
                            </article>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white shadow-md rounded-lg mb-4 boder">
                        <LatestOrder orders={orders} loading={false} error={false} />
                    </div>
                </div>
            </section>
        </div>
    );
}
export default HomePage;