"use client";
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  image_url: string;
}

const fetchProducts = async () => {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data.map((product) => ({
    ...product,
    image: supabase.storage.from("product-images").getPublicUrl(product.image).data.publicUrl,
  }));
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const adminNumber = "+2348036026669";

  const handlePurchase = () => {
    const message = `Hello Sandexlizzy, I want to buy the following product:\n\n🛒 *Product:* ${product.name}\n💰 *Price:* ₦${product.price}\n🖼 *Image:* ${product.image_url}\n\nPlease provide me with payment details.`;
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-full md:w-full lg:w-full transition-transform transform hover:scale-105">
      <img src={product.image_url} alt={product.name} className="w-full h-50" />
      <div className="p-4">
        <h3 className="text-lg font-semibold gray800">{product.name}</h3>
        <p className="gray600 h-20 text-sm mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold primaryColor">{formatCurrency(parseFloat(product.price))}</span>
          <button 
            onClick={handlePurchase}
            className="flex cursor-pointer items-center bgprimaryColor text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaShoppingCart className="mr-2" /> Purchase
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
console.log("Products", products)


  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading products...</p>;

  return (
    <section className="container mx-auto px-6 md:px-20 py-10 mt-25">
      <h1 className="text-2xl md:text-4xl font-extrabold primaryColor">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {products.length > 0 ? (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </section>
  );
};

export default ProductList;
