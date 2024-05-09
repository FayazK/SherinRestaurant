import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import logo from "../assets/logo.png";

const OrderInvoice = ({ order }) => {
  console.log("order", order);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 5mm;
      }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .invoice-container {
          width: 120mm; /* Adjust width as necessary for your receipt size */
        }
      }
    `,
  });

  // Calculate total price for each item
  const renderItems = () =>
    order.cartItems.map((item, index) => (
      <tr key={index}>
        <td>{item.product.name}</td>
        <td>{item.quantity}</td>
        <td>{item.product.price} Rs</td>
      </tr>
    ));

  const renderPrice = () => {
    const total = order.cartItems.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    return (
      <tr>
        <td>{total.toFixed(2)} Rs</td>
      </tr>
    );
  };

  // Function to render discount percentage
  const renderDiscounts = () =>
    order.cartItems.map((item, index) => (
      <tr key={index}>
        <td style={{ flexDirection: "row", alignItems: "center" }}>{`${
          item.product.discount || 0
        }%`}</td>
      </tr>
    ));

  const subtotal = order.cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <div>
      <div ref={componentRef} className="invoice-container">
        <div className="invoice-header">
          <img src={logo} alt="Company Logo" className="invoice-logo" />
          <h4 className="invoice-title">Retail Invoice</h4>
          <div class="dotted-line"></div>

          <div style={{ lineHeight: "1.5rem" }}>
            <h5 className="invoice-payment-mode">
              Serial Number: #SH{order._id.slice(0, 5)}
            </h5>
            <h5 className="invoice-payment-mode">
              Address : {order.deliveryaddress}
            </h5>
            <h5 className="invoice-payment-mode">
              Phone# : {order.userDetails.phone}
            </h5>
            <h5 className="invoice-date">
              Date: {new Date(order.createdAt).toLocaleString()}
            </h5>
            <h5 className="invoice-date">Payment Mode: Cash</h5>
          </div>
        </div>
        <div class="dotted-line"></div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{renderItems()}</tbody>
        </table>
        <div class="dotted-line"></div>

        <div className="invoice-summary">
          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              display: "flex",
            }}
          >
            <p>Sub Total : </p>
            <p>{renderPrice()} </p>
          </div>
          <p>Sale Tax: {order.gst} Rs </p>

          <p>Discount: {order.discount} Rs </p>
          <p>Delivery Charges: {Math.round(order.deliverycharges)} Rs</p>
        </div>
        <div class="dotted-line"></div>

        <div
          style={{
            flexDirection: "row",
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3> Total </h3>
          <p>{order.total} Rs</p>
        </div>
      </div>
      <Button type="primary" onClick={handlePrint} className="print-button">
        Print Invoice
      </Button>
    </div>
  );
};

export default OrderInvoice;
