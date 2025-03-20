"use client"
import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "1.5kva Solar Energy System",
    description: "1.5kVA Solar Energy System: Includes 1.5kVA Inverter, 1 Solar Panel, 1 Charge Controller, and a 220Ah Battery",
    price: "1,000,000.00",
    image: "/product/inverter.jpg",
  },
  {
    id: 2,
    name: "Solar Freezer",
    description: "Solar Freezer: Includes 2 Solar Panels, 1 Battery, and 1 DC Freezer",
    price: "700,000.00",
    image: "/product/solarfreezer.jpg",
  },
  {
    id: 3,
    name: "Solar Fan",
    description: "Solar Fan: Includes 1 panel, and 1 DC fan",
    price: "100,000.00",
    image: "/product/solarfan.jpg",
  },
  {
    id: 4,
    name: "4kva Solar Energy System",
    description: "4.5kva Solar Energy System: Includes 4.5kVA Inverter, 1 Solar Panel, 1 Charge Controller, and 4 200Ah Batteries",
    price: "1,500,000.00",
    image: "/product/4kva_inverter.jpg",
  },
  {
    id: 5,
    name: "100 watt solar light",
    description: "100 watt solar light: Includes 1 panel, and 1 DC light",
    price: "60,000.00",
    image: "/product/100watt_solarlight.jpg",
  },
  {
    id: 6,
    name: "200 watt solar light",
    description: "200 watt solar light: Includes 1 panel, and 1 DC light",
    price: "100,000.00",
    image: "/product/200watt_solarlight.jpg",
  },
];

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const adminNumber = "+2348036026669"; 
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setImageUrl(`${window.location.origin}${product.image}`);
    }
  }, [product.image]);
  const handlePurchase = () => {
    const message = `Hello Sandexlizzy, I want to buy the following product:\n\n🛒 *Product:* ${product.name}\n💰 *Price:* ₦${product.price}\n🖼 *Image:* ${imageUrl}\n\nPlease provide me with payment details.`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp link (ensure admin's number includes country code)
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-full md:w-full lg:w-full transition-transform transform hover:scale-105">
      {/* Product Image */}
      <img src={product.image} alt={product.name} className="w-full h-50" />

      {/* Product Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold gray800">{product.name}</h3>
        <p className="gray600 h-20 text-sm mt-1">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-bold blue600">₦{product.price}</span>
          <button 
            onClick={handlePurchase}
            className="flex cursor-pointer items-center bgblue600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <FaShoppingCart className="mr-2" /> Purchase
          </button>
        </div>
      </div>
    </div>
  );
};



const ProductList: React.FC = () => {
  return (
    <section className="container mx-auto px-6 md:px-20 py-10 mt-25">
      <h1 className="text-2xl md:text-4xl font-extrabold blue600">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
