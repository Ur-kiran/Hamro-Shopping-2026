// import { createTransport } from "nodemailer";

// const sendOrderConfirmation = async ({
//   email,
//   subject,
//   orderId,
//   products,
//   totalAmount,
// }) => {
//   const transport = createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     auth: {
//       user: process.env.GMAIL,
//       pass: process.env.GMAIL_PASSWORD,
//     },
//   });

//   const productsHtml = products
//     .map(
//       (product) => `
//             <tr>
//                 <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
//                 <td style="padding: 10px; border: 1px solid #ddd;">${product.quantity}</td>
//                 <td style="padding: 10px; border: 1px solid #ddd;">Rs${product.price}</td>
//             </tr>
//         `
//     )
//     .join("");

//   const html = `<!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Order Confirmation</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             margin: 0;
//             padding: 0;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             background-color: #f9f9f9;
//             height: 100vh;
//         }
//         .container {
//             background-color: #fff;
//             padding: 20px;
//             border-radius: 8px;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             text-align: center;
//         }
//         h1 {
//             color: #4caf50;
//         }
//         p {
//             color: #333;
//         }
//         table {
//             width: 100%;
//             border-collapse: collapse;
//             margin: 20px 0;
//         }
//         th, td {
//             padding: 10px;
//             border: 1px solid #ddd;
//             text-align: left;
//         }
//         th {
//             background-color: #f2f2f2;
//         }
//         .total {
//             font-size: 18px;
//             font-weight: bold;
//             color: #000;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <h1>Order Confirmation</h1>
//         <p>Dear ${email},</p>
//         <p>Your order (ID: <strong>${orderId}</strong>) has been successfully placed.</p>
//         <table>
//             <thead>
//                 <tr>
//                     <th>Product</th>
//                     <th>Quantity</th>
//                     <th>Price</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 ${productsHtml}
//             </tbody>
//         </table>
//         <p class="total">Total Amount: Rs${totalAmount}</p>
//         <p>Thank you for shopping with us!</p>
//     </div>
// </body>
// </html>`;

//   await transport.sendMail({
//     from: process.env.GMAIL,
//     to: process.env.ADMIN_EMAIL,
//     subject,
//     html,
//   });
// };

// export default sendOrderConfirmation;




// import { createTransport } from "nodemailer";

// const sendOrderConfirmation = async ({
//   email,
//   subject,
//   orderId,
//   products,
//   totalAmount,
// }) => {
//   const transport = createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.GMAIL,
//       pass: process.env.GMAIL_PASSWORD,
//     },
//   });

//   // Build product rows
//   const productsHtml = products
//     .map(
//       (product) => `
//         <tr>
//           <td style="padding: 10px; border: 1px solid #ddd;">
//             ${product.name}
//           </td>
//           <td style="padding: 10px; border: 1px solid #ddd;">
//             ${product.quantity}
//           </td>
//           <td style="padding: 10px; border: 1px solid #ddd;">
//             Rs ${product.price}
//           </td>
//         </tr>
//       `
//     )
//     .join("");

//   // Email template
//   const html = `
//     <div style="font-family: Arial; padding: 20px;">
//       <h2 style="color: #4caf50;">Order Confirmation</h2>

//       <p>Dear ${email},</p>
//       <p>Your order has been successfully placed.</p>

//       <p><strong>Order ID:</strong> ${orderId}</p>

//       <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
//         <thead>
//           <tr>
//             <th style="border:1px solid #ddd; padding:10px;">Product</th>
//             <th style="border:1px solid #ddd; padding:10px;">Qty</th>
//             <th style="border:1px solid #ddd; padding:10px;">Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           ${productsHtml}
//         </tbody>
//       </table>

//       <h3 style="margin-top:20px;">Total: Rs ${totalAmount}</h3>

//       <p>Thank you for shopping with us ❤️</p>
//     </div>
//   `;

//   // 1️⃣ Send email to CUSTOMER
//   await transport.sendMail({
//     from: process.env.GMAIL,
//     to: email,
//     subject: subject || "Order Confirmation",
//     html,
//   });

//   // 2️⃣ Send email to ADMIN
//   await transport.sendMail({
//     from: process.env.GMAIL,
//     to: process.env.ADMIN_EMAIL,
//     subject: "New Order Received",
//     html: `
//       <h3>New Order Alert</h3>
//       <p><strong>Order ID:</strong> ${orderId}</p>
//       <p><strong>Customer:</strong> ${email}</p>
//       <p><strong>Total:</strong> Rs ${totalAmount}</p>
//     `,
//   });
// };

// export default sendOrderConfirmation;



import { createTransport } from "nodemailer";

const sendOrderConfirmation = async ({
  email,
  subject,
  orderId,
  products,
  totalAmount,
}) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const productsHtml = products
    .map(
      (product) => `
            <tr>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.name}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">${product.quantity}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">Rs${product.price}</td>
            </tr>
        `
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f9f9f9;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        h1 {
            color: #4caf50;
        }
        p {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            padding: 10px;
            border: 1px solid #ddd;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
        .total {
            font-size: 18px;
            font-weight: bold;
            color: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Order Confirmation</h1>
        <p>Dear ${email},</p>
        <p>Your order (ID: <strong>${orderId}</strong>) has been successfully placed.</p>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                ${productsHtml}
            </tbody>
        </table>
        <p class="total">Total Amount: Rs${totalAmount}</p>
        <p>Thank you for shopping with us!</p>
    </div>
</body>
</html>`;

  await transport.sendMail({
    from: process.env.GMAIL,
    to: email,
    subject,
    html,
  });
};

export default sendOrderConfirmation;