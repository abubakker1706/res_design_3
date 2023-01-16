import React, { useContext, useState } from "react";
import "./NavQuana.css";
import Hamburger from "./Hamburger";
import Button from "@mui/material/Button";
import { Values } from "../Context/ContextTab";
import Modal from "react-modal";
// import { Alert } from "react-alert";
const NavQuana = () => {
  const { Dark, setDark } = useContext(Values);
  const { ShopName, setShopName } = React.useContext(Values);
  const { Orders, setOrders } = React.useContext(Values);
  const [ModalOpen, setModalOpen] = useState(false);

  console.log(Orders);

  const OrderPlaced = () => {
    setModalOpen(false);
    setOrders([]);
    alert("Order Placed Sucessfully");
  };

  // const ids = Orders.map((o) => o.id);
  // let count = 0;
  // const filtered = Orders.filter(
  //   ({ id }, index) => !ids.includes(id, index + 1)
  //   // count = count + 1;
  // );

  // console.log(filtered);

  const answer = Object.values(
    Orders.reduce((p, v) => {
      const old = p[v.id];
      if (!old) p[v.id] = { ...v, count: 1 };
      else if (old.sort > v.sort) p[v.id] = { ...v, count: old.count + 1 };
      else p[v.id].count++;
      return p;
    }, {})
  );

  console.log(answer);

  let price = 0;

  answer.map((item) => {
    price = price + item.price * item.count;
  });

  console.log(price);
  return (
    <div>
      <div
        className="nav"
        style={{ backgroundColor: Dark ? "#282828" : "white" }}
      >
        <div className="menu" style={{ cursor: "pointer", position: "fixed" }}>
          <Button
            onClick={() => {
              // setDark(!Dark);
              setModalOpen(true);
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              src={require("../assets/cart.png")}
              width="50px"
            />
            <div
              style={{
                height: 20,
                width: 20,
                backgroundColor: "red",
                borderRadius: 10,
                marginTop: -15,
                marginLeft: -10,
              }}
            >
              <p style={{ marginTop: -2, color: "white", fontWeight: "bold" }}>
                {Orders.length}
              </p>
            </div>
          </Button>
          <p
            style={{
              color: "white",
              marginTop: -10,
              marginLeft: -16,
              marginBottom: 30,
              color: "red",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Review Orders
          </p>
        </div>

        <div style={{ cursor: "pointer" }} className="topbar">
          <p
            style={{
              fontFamily: "PlayfairDisplay-Regular",
              fontSize: "30px",
              marginLeft: 20,
              color: Dark ? "white" : "black",
            }}
          >
            {ShopName}
          </p>
        </div>
        <div className="mode" style={{ cursor: "pointer" }}>
          <Button
            onClick={() => {
              setDark(!Dark);
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              src={
                !Dark
                  ? require("../assets/day.png")
                  : require("../assets/night.png")
              }
              width="90px"
              alt="mode"
            />
          </Button>
        </div>
      </div>

      <Modal
        isOpen={ModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => {
          setModalOpen(false);
        }}
        // style={{ width: 250, height: 100 }}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button
          onClick={() => {
            setModalOpen(false);
          }}
        >
          close
        </button>

        {answer.map((item, index) => {
          return (
            <div style={{ display: "flex", marginLeft: 10 }}>
              <p style={{ color: "black" }}>
                {index + 1}. {item?.name}
              </p>
              <p style={{ color: "black", marginLeft: 10 }}>
                {item?.price}X{item?.count}=
              </p>
              <p style={{ color: "black", marginLeft: 10 }}>
                INR {item?.price * item?.count}
              </p>
            </div>
          );
        })}

        <p style={{ marginLeft: 60 }}>Total INR{price}/-</p>

        <div
          style={{
            height: 40,
            backgroundColor: "orange",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            // flex: 1,
          }}
          onClick={OrderPlaced}
        >
          <p style={{ color: "black" }}>Confirm Order</p>
        </div>
      </Modal>
    </div>
  );
};

export default NavQuana;
