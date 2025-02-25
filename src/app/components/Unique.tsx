"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "../../../types/products";
import { urlFor } from "@/sanity/lib/image";
import { uniqueProducts } from "@/sanity/lib/queries"; // Use the correct query

const UniqueProductsComponent = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const fetchedProduct = await client.fetch(uniqueProducts);
        console.log("Fetched Product:", fetchedProduct); // Log the fetched product

        // Since we're getting a single product, directly set it
        if (fetchedProduct) {
          setProduct(fetchedProduct);
        } else {
          setError("No product found.");
        }
      } catch (error) {
        setError("Error fetching product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // If there's no product, show an error message
  if (!product) {
    return <div>No product available.</div>;
  }

  return (
    <div className="w-full bg-gray-100 py-20">
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div className="relative flex justify-center items-center">
          <div className="absolute inset-0 flex justify-center items-center">
            {/* Background Image */}
            <div className="bg-pink-100 w-[400px] h-[400px] rounded-full mx-auto mb-4">
              {/* Product Image */}
              {product?.image?.asset ? (
                <Image
                  src={urlFor(product.image).url()}
                  alt={`Product image of ${product?.name || "Product"}`}
                  width={400}
                  height={400}
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-200">
                  <span className="text-gray-500">Image Unavailable</span>
                </div>
              )}
            </div>
          </div>

          {/* View Details Button */}
          {product?.slug?.current && (
            <div className="absolute bottom-0 w-full text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link href={`/product/${product.slug?.current}`}>
                <button className="w-full py-2 text-sm bg-[#08D15F] rounded-none hover:bg-green-700 transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="px-4 md:px-0">
          <h2 className="text-[#3F509E] text-3xl font-bold mb-6">
            Unique Features Of Latest & Trending Products
          </h2>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-1 mr-4"></div>
              <p className="text-gray-600">
                All frames constructed with hardwood solids and laminates.
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-4 h-4 rounded-full bg-[#3F509E] flex-shrink-0 mt-1 mr-4"></div>
              <p className="text-gray-600">
                Reinforced with double wood dowels, glue, screw-nails, corner
                blocks, and machine nails.
              </p>
            </li>
            <li className="flex items-start">
              <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-1 mr-4"></div>
              <p className="text-gray-600">
                Arms, backs, and seats are structurally reinforced.
              </p>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <button className="bg-pink-500 text-white py-2 px-6 rounded-lg hover:bg-pink-600 transition-colors">
                Add To Cart
              </button>
            </Link>

            <div>
              <p className="text-[#3F509E] font-semibold text-sm">
                {product.name || "Product Name"}
              </p>
              <p className="text-[#3F509E] font-bold text-sm">{product.price || "32.00"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniqueProductsComponent;
