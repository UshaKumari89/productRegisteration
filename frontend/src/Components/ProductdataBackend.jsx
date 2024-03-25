// // ProductDataBackend.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Home from './Home';

// function ProductDataBackend() {
//   const [productInfo, setProductInfo] = useState(null);

//   useEffect(() => {
//     const fetchProductInfo = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/api/products');
//         const data = response.data;
//         if (data.success && data.products.length > 0) {
//           setProductInfo(data.products[0]);
//         } else {
//           console.error('Failed to fetch product information:', data.error);
//         }
//       } catch (error) {
//         console.error('Error fetching product information:', error);
//       }
//     };

//     fetchProductInfo();
//   }, []);

//   return (
//     <Home productInfo={productInfo} />
//   );
// }

// export default ProductDataBackend;
