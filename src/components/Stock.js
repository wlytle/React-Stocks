import React from "react";

const Stock = ({ stock, exchangeStock }) => {
  const { name, price, ticker, id } = stock;
  return (
    <div>
      <div className="card">
        <div className="card-body" data-id={id} onClick={exchangeStock}>
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{`${ticker}: ${price}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Stock;
