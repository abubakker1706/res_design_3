import React from "react";
import { Container } from "@mui/system";
import Divider from "@mui/material/Divider";
import { Values } from "../../Context/ContextTab";

const Footer = () => {
  const { Dark } = React.useContext(Values);
  return (
    <div
      style={{
        backgroundColor: Dark ? "#353535" : "white",
        boxShadow: "0px 1px 8px #888888",
      }}
    >
      <Container maxWidth="sm">
        <div>
          <div style={{ marginTop: 6 }}>
            <img
              src={require("../../assets/logo_round.png")}
              height={50}
              style={{ marginTop: 5 }}
            />
          </div>
          <p style={{ color: Dark ? "white" : "black", fontStyle: "italic" }}>
            Quana Insights private limited
          </p>
        </div>

        <Divider style={{ background: Dark ? "white" : "black" }} />
        <p style={{ color: Dark ? "white" : "black", fontStyle: "italic" }}>
          © Copyright 2022
        </p>

        <div
          style={{
            paddingBottom: 20,
            justifyContent: "end",
            flex: 1,
            display: "flex",
          }}
        >
          <img
            src={require("../../assets/fb.png")}
            height={50}
            style={{ marginLeft: 10 }}
          />
          <img
            src={require("../../assets/link.png")}
            height={50}
            style={{ marginLeft: 10 }}
          />
          <img
            src={require("../../assets/tweet.png")}
            height={50}
            style={{ marginLeft: 10 }}
          />
        </div>
      </Container>
    </div>
  );
};

export default Footer;
