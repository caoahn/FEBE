import TopTotal from "../components/home/Total";
import LatestOrder from "../components/home/LatestOrder";
import { useEffect, useState } from 'react';
import { useQuery} from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductApi from "../apis/productApi";

function HomePage() {
    const [orders, setOrders] = useState([]);
    const [limit, setLimit] = useState(3);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [products, setProducts] = useState([]);

    const { data: product, isLoading: isLoadingProducts, error: errorProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductApi.getAllProducts(),
  })

    const fetchOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/checkout-sessions?limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      setOrders(data);
    } catch (err) {
      setError(err.message || 'Error fetching orders');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: currency || 'VND'
    });
    return formatter.format(amount);
  };

  useEffect(() => {
    fetchOrders();
  }, [limit]);

  useEffect(() => {
    if(product) {
      setProducts(product);
    }
  }, [product])

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
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr className="bg-white-100 text-gray-700 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Amount</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-left">Created</th>
                            </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                            {orders.map((order, index) => (
                                <tr
                                key={order.id}
                                className={`border-b hover:bg-gray-50 ${
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                }`}
                                >
                                <td className="py-3 px-6">{order.id}</td>
                                <td className="py-3 px-6">
                                    {formatCurrency(order.amount_total, order.currency)}
                                </td>
                                <td className="py-3 px-6 capitalize">{order.payment_status}</td>
                                <td className="py-3 px-6">
                                    {new Date(order.created * 1000).toLocaleString()}
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default HomePage;