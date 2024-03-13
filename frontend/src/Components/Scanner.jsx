// import React, { useState } from 'react';
// import QrScanner from 'react-qr-scanner';
// // import qrScan from '../images/qr-code.png'
// import './Scanner.scss';

// const QRCodeScanner = ({ onScan }) => {
//   const [scanning, setScanning] = useState(false);

//   const handleScan = (data) => {
//     if (data && data.text) {
//       console.log('Scanned Data:', data); // Add this console.log statement

//       // Simulate capturing an image (replace this with your actual image logic)
//       const imgDataUrl = data.img || '';

//       // Pass the scanned data and image to the parent component
//       onScan({ ...data, img: imgDataUrl });
//       setScanning(false);
      
//       window.scrollTo(0, 0);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setScanning(false);
//   };

//   const startScanning = (e) => {
//     e.preventDefault();
//     setScanning(true);
//   };

//   return (
//     <section className="Qr-Code">
//       {scanning ? (
//         <QrScanner
//           onScan={handleScan}
//           onError={handleError}
//           onCancel={() => setScanning(false)}
//           style={{ width: '15rem', height: '15rem' }}
//         />
//       ) : (
//         <>
//           <button className="button btn" onClick={startScanning}>
//             SCAN QR CODE/BAR
//           </button>
//         </>
//       )}
//       {/* <img src={qrScan} alt="qr-scan" className='image' /> */}
//     </section>
//   );
// };

// export default QRCodeScanner;
import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';
import './Scanner.scss';

const QRCodeScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const handleScan = (data) => {
    if (data && data.text) {
      // Extracting parameters from the URL
      const urlParams = new URLSearchParams(data.text);
      const serialNumber = urlParams.get('serial');
      const articleNumber = urlParams.get('sku');
      let purchaseDate = urlParams.get('date');
  
      // Format the purchase date if available
      if (purchaseDate) {
        purchaseDate = new Date(purchaseDate).toISOString(); // Convert to ISO format
      }
  
      // Constructing the product info object
      const productInfo = {
        serialNumber,
        articleNumber,
        purchaseDate
      };
  
      // Log the extracted product info
      console.log("Scanned Product Info:", productInfo);
  
      // Pass the product info to the parent component or perform further actions
      onScan(productInfo);
  
      // Stop scanning
      setScanning(false);
  
      window.scrollTo(0, 0);
    }
  };
  

  const handleError = (err) => {
    console.error(err);
    setScanning(false);
  };

  const startScanning = (e) => {
    e.preventDefault();
    setScanning(true);
  };

  return (
    <section className="Qr-Code">
      {scanning ? (
        <QrScanner
          onScan={handleScan}
          onError={handleError}
          onCancel={() => setScanning(false)}
          style={{ width: '15rem', height: '15rem' }}
        />
      ) : (
        <>
          <button className="button btn" onClick={startScanning}>
            SCAN QR CODE/BAR
          </button>
        </>
      )}
    </section>
  );
};

export default QRCodeScanner;
