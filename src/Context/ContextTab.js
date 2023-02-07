import React, { createContext, useState } from "react";

export const Values = createContext();
const ContextTab = ({ children }) => {
  const [Dark, setDark] = useState(false);
  const [ShopName, setShopName] = useState("");
  const [Orders, setOrders] = useState([]);
  // const [RestId, setRestId] = useState(null);
  return (
    <Values.Provider
      value={{
        Dark,
        setDark,
        ShopName,
        setShopName,
        Orders,
        setOrders,
      }}
    >
      {children}
    </Values.Provider>
  );
};

export default ContextTab;
