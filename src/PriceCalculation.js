import React, { useEffect, useState } from "react";

const data = [
  {
    category: "beaf",
    options: [
      { subCategory: "Cheap Beaf", price: 10 },
      { subCategory: "Expensive Beaf", price: 20 },
    ],
  },
  {
    category: "cheese",
    options: [
      { subCategory: "Cheap Cheese", price: 10 },
      { subCategory: "Expensive Cheese", price: 20 },
    ],
  },
  {
    category: "bread",
    options: [
      { subCategory: "Cheap Bread", price: 10 },
      { subCategory: "Expensive Bread", price: 20 },
    ],
  },
];

const PriceCalculation = () => {
  const [selectedPrice, setSelectedPrice] = React.useState({
    beaf: 0,
    cheese: 0,
    bread: 0,
  });

  const [totalPrice, setTotalPrice] = React.useState(0);

  useEffect(() => {
    let initialPrices = {};

    data.map(({ category, options }) => {
      initialPrices = {
        ...initialPrices,
        [category]: options[0].price,
      };
    });

    setSelectedPrice(initialPrices);
  }, []);

  useEffect(() => {
    const finalPrice = Object.keys(selectedPrice)
      .map((key) => selectedPrice[key])
      .reduce((total, num) => total + num);

    setTotalPrice(+finalPrice);
  }, [selectedPrice]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSelectedPrice((prevState) => ({
      ...prevState,
      [name]: +value,
    }));
  };

  return (
    <div className="App">
      <form>
        {data.map(({ category, options }) => {
          return (
            <div className="form-group" key={category}>
              <label>{category}</label>
              {options.map(({ subCategory, price }, i) => {
                return (
                  <div className="form-check" key={i}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={category}
                      id={`${category}-${i + 1}`}
                      value={price}
                      checked={selectedPrice[category] === price}
                      onChange={(e) => handleOnChange(e)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`${category}-${i + 1}`}
                    >
                      {subCategory} - {price}
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}

        <label>Total Price</label>
        <input
          className="form-control"
          type="text"
          placeholder="Readonly input here…"
          readOnly
          value={totalPrice}
        />
      </form>
    </div>
  );
};

export default PriceCalculation;
