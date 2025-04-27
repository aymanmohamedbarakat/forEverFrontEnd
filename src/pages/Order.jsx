// import React, { useEffect } from "react";
// import { orderRepo } from "../data/Repo/OrderRepo";
// import { useAuthStore } from "../Hooks/authStore";

// export default function Order() {
// const {currentUser ,authToken }  =useAuthStore()
//   useEffect(() => {
//     if (currentUser && authToken) {
//       orderRepo.getOrder(currentUser.id, authToken).then((res) => {
//         console.log("Order data:", res);
//       });
//     }
//   }, [currentUser, authToken]);

//   return (
//     <div>
//       Order
//       <span className="text-sm">Pending</span>
//       {/* {statusInfo.text} */}
//       <p className="text-sm text-gray-600 sm:text-base font-medium">
//         Product Name {/* {product.name || "Product Name"} */}
//       </p>
//       <p className="text-lg font-semibold">
//         {/* {currency}
//         {product.price || 0} */}
//         $100.00
//       </p>
//       <p>Quantity: 1 </p>
//       {/*{item.quantity || 1} */}
//       <p className="">Size: L</p>
//       {/*{item.size}*/}
//       Total: $1800 {/* {currency} {totalPrice} */}
//     </div>
//   );
// }

/////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { orderRepo } from "../data/Repo/OrderRepo";
import { useAuthStore } from "../Hooks/authStore";

export default function Order() {
  const { currentUser, authToken } = useAuthStore();
  const [orders, setOrders] = useState([]);
  // const [orderItems, setOrderItems] = useState([]);
  const [ordersWithDetails, setOrdersWithDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getOrders() {
      try {
        if (!currentUser || !authToken) {
          setError("User not authenticated");
          setLoading(false);
          return;
        }

        const orderData = await orderRepo.getOrder(currentUser.id, authToken);
        setOrders(orderData);
        console.log(orderData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Failed to fetch orders");
        setLoading(false);
      }
    }
    getOrders();
  }, [currentUser, authToken]);

  // useEffect(() => {
  //   async function getOrdersItems() {
  //     try {
  //       if (!currentUser || !authToken) {
  //         setError("User not authenticated");
  //         setLoading(false);
  //         return;
  //       }
  //       const allOrderItems = [];
  //       for (const order of orders) {
  //         const orderItemsData = await orderRepo.getOrderItems(
  //           currentUser.id,
  //           authToken
  //         );
  //         allOrderItems.push(...orderItemsData);
  //       }
  //       setOrderItems(allOrderItems);
  //       console.log(allOrderItems);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error("Failed to fetch orders:", err);
  //       setError(err.message || "Failed to fetch orders");
  //       setLoading(false);
  //     }
  //   }
  //   getOrdersItems();
  // }, [currentUser, authToken ,orders]);

  useEffect(() => {
    async function getOrderDetailsById() {
      try {
        if (!currentUser || !authToken || orders.length === 0) {
          setError("User not authenticated or no orders found");
          setLoading(false);
          return;
        }

        const ordersWithDetails = await Promise.all(
          orders.map(async (order) => {
            const orderDetails = await orderRepo.getOrderDetailsById(
              order.id,
              authToken
            );
            return orderDetails;
          })
        );

        setOrdersWithDetails(ordersWithDetails); // تحديث الحالة بالتفاصيل
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setError(err.message || "Failed to fetch order details");
        setLoading(false);
      }
    }

    if (orders.length > 0) {
      getOrderDetailsById();
    }
  }, [orders, currentUser, authToken]);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;
  if (orders.length === 0) return <div>No orders found.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {ordersWithDetails.map((order) => (
        <div key={order.id} className="border p-4 mb-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Order #{order.id}</h3>
            <span className="text-sm px-2 py-1 bg-yellow-100 rounded">
              {order.order_status || "Pending"}
            </span>
          </div>
          {/* You would need to adjust this based on your actual data structure */}
          {/* // Inside your Order rendering function */}
          {order.order_items.length > 0 ? (
            order.order_items.map((item) => (
              <div key={item.id} className="space-y-3">
                <div className="flex justify-between border-t pt-2">
                  <div>
                    <p className="font-medium">
                      {item.product?.name || "Product"}
                    </p>
                    <p className="text-sm">Quantity: {item.quantity || 1}</p>
                    {item.size && <p className="text-sm">Size: {item.size}</p>}
                  </div>
                  <p className="font-semibold">${item.product?.price || 0}</p>
                </div>
                <div className="border-t pt-2 text-right">
                  <p className="font-bold">Total: ${order.total || "N/A"}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No items in this order</p>
          )}
        </div>
      ))}
    </div>
  );
}

// last update before claudi 
////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { orderRepo } from "../data/Repo/OrderRepo";
// import { useAuthStore } from "../Hooks/authStore";

// export default function Order() {
//   const { currentUser, authToken } = useAuthStore();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         if (!currentUser || !authToken) {
//           setError("User not authenticated");
//           setLoading(false);
//           return;
//         }

//         const orderData = await orderRepo.getOrder(currentUser.id, authToken);
//         console.log("Orders fetched:", orderData);
//         setOrders(orderData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch orders:", err);
//         setError(err.message || "Failed to fetch orders");
//         setLoading(false);
//       }
//     }
//     fetchOrders();
//   }, [currentUser, authToken]);

//   if (loading) return <div className="p-4 text-center">Loading orders...</div>;
//   if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;
//   if (!orders || orders.length === 0) return <div className="p-4 text-center">No orders found.</div>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Your Orders</h2>
//       {orders.map((order) => (
//         <div key={order.id} className="border p-4 mb-4 rounded shadow">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-medium">Order #{order.id}</h3>
//             <span className="text-sm px-2 py-1 bg-yellow-100 rounded">
//               {order.order_status || "Pending"}
//             </span>
//           </div>
          
//           {/* Order items section */}
//           {order.order_item && (
//             <div className="border-t pt-2 mt-2">
//               <div className="flex justify-between mb-2">
//                 <p className="font-medium">
//                   {order.order_item.product?.name || "Product"}
//                 </p>
//                 <p className="font-semibold">${order.order_item.product?.price || 0}</p>
//               </div>
//               <div className="text-sm space-y-1">
//                 <p>Quantity: {order.order_item.quantity || 1}</p>
//                 {order.order_item.size && <p>Size: {order.order_item.size}</p>}
//               </div>
//               <div className="border-t pt-2 mt-2 text-right">
//                 <p className="font-bold">
//                   Total: ${(order.order_item.product?.price || 0) * (order.order_item.quantity || 1)}
//                 </p>
//               </div>
//             </div>
//           )}
          
//           {/* If there's no order_item directly on the order, but there are order_items array */}
//           {!order.order_item && order.order_items && order.order_items.length > 0 && (
//             <div>
//               {order.order_items.map((item) => (
//                 <div key={item.id} className="border-t pt-2 mt-2">
//                   <div className="flex justify-between mb-2">
//                     <p className="font-medium">
//                       {item.product?.name || "Product"}
//                     </p>
//                     <p className="font-semibold">${item.product?.price || 0}</p>
//                   </div>
//                   <div className="text-sm space-y-1">
//                     <p>Quantity: {item.quantity || 1}</p>
//                     {item.size && <p>Size: {item.size}</p>}
//                   </div>
//                 </div>
//               ))}
//               <div className="border-t pt-2 mt-2 text-right">
//                 <p className="font-bold">
//                   Total: ${order.total || calculateTotal(order.order_items)}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// // Helper function to calculate total if not provided directly
// function calculateTotal(items) {
//   if (!items || !Array.isArray(items)) return 0;
  
//   return items.reduce((sum, item) => {
//     const price = item.product?.price || 0;
//     const quantity = item.quantity || 1;
//     return sum + (price * quantity);
//   }, 0);
// }
