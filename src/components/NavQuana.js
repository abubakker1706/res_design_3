import React, { useContext } from "react";
import "./NavQuana.css";
import Hamburger from "./Hamburger";
import Button from "@mui/material/Button";
import { Values } from "../Context/ContextTab";
const NavQuana = () => {
  const { Dark, setDark } = useContext(Values);
  const { ShopName, setShopName } = React.useContext(Values);
  const { Orders } = React.useContext(Values);

  return (
    // <div style={{ position: "fixed", marginTop: 10 }}>
    <div>
      <div
        className="nav"
        style={{ backgroundColor: Dark ? "#282828" : "white" }}
      >
        {/* <div className="menu" style={{ cursor: "pointer" }}>
        <Hamburger />
      </div> */}
        <div className="menu" style={{ cursor: "pointer", position: "fixed" }}>
          <Button
            onClick={() => {
              setDark(!Dark);
            }}
          >
            <img
              style={{ cursor: "pointer" }}
              src={require("../assets/cart.png")}
              width="50px"
              // alt="mode"
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
          <p style={{ color: "white", marginTop: -10, marginLeft: -16 }}>
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
    </div>
  );
};

export default NavQuana;
