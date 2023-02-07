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

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: 10,
      borderWidth: 5,
      borderColor: "orange",
    },
  };

  const answer = Object.values(
    Orders.reduce((p, v) => {
      const old = p[v.id];
      if (!old) p[v.id] = { ...v, count: 1 };
      else if (old.sort > v.sort) p[v.id] = { ...v, count: old.count + 1 };
      else p[v.id].count++;
      return p;
    }, {})
  );

  // console.log(answer);

  let price = 0;

  answer.map((item) => {
    price = price + item.price * item.count;
  });

  const OrderPlaced = () => {
    setModalOpen(false);
    setOrders([]);
    alert(`Order Placed of INR ${price}/- Sucessfully !`);
  };

  // console.log(price);
  return (
    <div>
      <div
        className="nav"
        style={{ backgroundColor: Dark ? "#282828" : "white" }}
        // style={{ backgroundColor: "yellow" }}
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
                backgroundColor: "#c53444",
                borderRadius: 10,
                marginTop: -10,
                marginLeft: -10,
              }}
            >
              <p style={{ marginTop: -1, color: "white", fontWeight: "bold" }}>
                {Orders.length}
              </p>
            </div>
          </Button>
        </div>

        <div style={{ cursor: "pointer" }} className="topbar">
          <p
            style={{
              fontFamily: "PlayfairDisplay-Regular",
              fontSize: "20px",
              // marginLeft: 20,
              color: Dark ? "white" : "black",
            }}
          >
            {ShopName}
          </p>
        </div>
        <div
          className="mode"
          style={{
            cursor: "pointer",
            display: "flex",
            flex: 1,
            // alignSelf: "flex-end",
          }}
        >
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
              width="65px"
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
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          onClick={() => {
            setModalOpen(false);
          }}
          style={{
            marginTop: -30,
            marginLeft: 350,
            cursor: "pointer",
          }}
        >
          <p style={{ color: "red" }}>X</p>
        </div>

        <p
          style={{
            color: "red",
            fontWeight: "bold",
            marginLeft: 100,
            textDecorationLine: "underline",
          }}
        >
          Orders Summary
        </p>

        <div style={{ marginLeft: 30 }}>
          <table>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th style={{ marginLeft: 10 }}> </th>
              <th style={{ marginLeft: 10 }}>Price</th>
            </tr>
            {answer.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{key + 1}</td>
                  <td>{item.name}</td>
                  <td>
                    {item?.price}x{item?.count}=
                  </td>
                  <td>{item?.price * item?.count}/-</td>
                </tr>
              );
            })}
            <tr className="total">
              <td>Total</td>
              <td> </td>
              <td>Items={Orders.length}</td>
              <td>{price}/-</td>
            </tr>
          </table>
        </div>

        {price !== 0 ? (
          <p></p>
        ) : (
          <p style={{ marginLeft: 70 }}>Please Add Item from Menu !</p>
        )}

        {price !== 0 ? (
          <div
            style={{
              height: 40,
              backgroundColor: "orange",
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: 20,
              // flex: 1,
            }}
            onClick={OrderPlaced}
          >
            <p style={{ color: "black" }}>Confirm Order</p>
          </div>
        ) : (
          <div
            style={{
              height: 40,
              backgroundColor: "#d0d0d0",
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              marginTop: 20,
              // flex: 1,
            }}
            // onClick={OrderPlaced}
          >
            <p style={{ color: "white" }}>Confirm Order</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NavQuana;
