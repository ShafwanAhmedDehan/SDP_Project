import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import axios from "axios";


export default function ViewWishlist() {
    const uid = sessionStorage.getItem('uid');

    const [wishProducts, setwishProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/wishlist/${uid}`)
            .then((response) => {
                //console.log(response.data);
                setwishProducts(response.data.wishlistItems);
            })
    }, [])


    const clearWishlist = async () => {
        axios.delete(`http://localhost:3000/delete/wishlist/${uid}`)
            .then((response) => {
                window.location.reload();
            })
    }

    const deleteProductFromWishlist = async (productId) => {
        console.log(productId);
        axios.delete(`http://localhost:3000/delete/product/wishlist/${uid}/${productId}`)
          .then((response) => {
            // Remove the deleted product from the wishProducts state
            window.location.reload();
          })
    }

    return (
        <>
            <Navbar/>
            
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                <span class="sr-only">Image</span>
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {wishProducts.length > 0 ? (
                        wishProducts.map((item) => (
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td class="w-32 p-4">
                                <img src="../images/nakshi_katha(1).jpg" alt="Product Image"></img>
                            </td>
                            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {item.productID.productName}
                            </td>
                            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {item.productID.description}
                            </td>
                            <td class="px-6 py-4">
                                <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => deleteProductFromWishlist(item._id)}>Remove</a>
                            </td>
                        </tr>
                    ))
                    ) : (
                    <p>No wishlist items found.</p>
                    )}
                    
                    </tbody>
                </table>
                <br /><br />&nbsp;
                <button onClick={clearWishlist} class="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Clear Wishlist
                    </span>
                </button>
            </div>
            <Footer/>
        </>
    );
}