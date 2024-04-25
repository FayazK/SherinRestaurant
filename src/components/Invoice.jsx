import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "antd";
import logo from "../assets/logo.jpg";

const OrderInvoice = ({ order }) => {
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
          width: 80mm; /* Adjust width as necessary for your receipt size */
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

  const subtotal = order.cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0
  );

  return (
    <div>
      <div ref={componentRef} className="invoice-container">
        <div className="invoice-header">
          <img src={logo} alt="Company Logo" className="invoice-logo" />
          <div style={{ margin: 0 }}>
            {" "}
            {/* Removed the gap property */}
            <p className="invoice-payment-mode">
              Aqba Road, Saidu Sharif, Pakistan
            </p>
            <p className="invoice-payment-mode">Contact No :0315 6884477</p>
          </div>

          <h1 className="invoice-title">Retail Invoice</h1>
          <p className="invoice-date">
            Date: {new Date(order.createdAt).toLocaleString()}
          </p>
          <p className="invoice-payment-mode">Payment Mode: Cash</p>
        </div>
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
        <div className="invoice-summary">
          <p>Sub Total: {subtotal} Rs</p>
          <p>Sale Tax: {order.tax} 0 Rs</p>
          <p className="invoice-total">Total: {order.total} Rs</p>
        </div>
      </div>
      <Button type="primary" onClick={handlePrint} className="print-button">
        Print Invoice
      </Button>
    </div>
  );
};

export default OrderInvoice;
