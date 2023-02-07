import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@mui/system";
import "./Content.css";

import axios from "axios";
import Divider from "@mui/material/Divider";
import { Values } from "../../Context/ContextTab";
import ApiCaller from "../../ApiCaller/ApiCaller";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Button from "@mui/material/Button";
import { CompressOutlined } from "@mui/icons-material";
// import { listClasses } from "@mui/material";

const NewsContent = () => {
  const [Index, setIndex] = useState(null);
  const [menu_type, setMenu_type] = useState([]);
  const [List, setList] = useState([]);
  const { Dark } = React.useContext(Values);
  const { ShopName, setShopName } = React.useContext(Values);
  const { Orders, setOrders } = React.useContext(Values);
  const [ImgLink, setImgLink] = useState("");
  const [SpcLink, setSpcLink] = useState("");

  const caller = (index) => {
    setList(menu_type[index]?.list);
    console.log(menu_type, index);
    setIndex(index);
  };

  const OrderReceiver = (id, name, price) => {
    let OrderArray = [...Orders, { id, name, price }];
    setOrders(OrderArray);
  };

  const OrderReducer = (id, name, price) => {
    // console.log("blah");
    const itemToBeRemoved = { id: id, name: name, price: price };
    let apps = Orders;
    const findIndex = apps.findIndex((a) => a.id === itemToBeRemoved.id);
    findIndex !== -1 && apps.splice(findIndex, 1);
    setOrders([...apps]);
  };

  // console.log("Orders are", Orders);

  const ItemCounter = (id, name, price) => {
    let count = 0;
    Orders.map((item) => {
      if (item?.id == id && item?.name == name && item?.price == price) {
        count = count + 1;
      }
    });
    return count;
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    // console.log(id);
    axios
      .get(`https://www.thequana.com/apimobile/menumaster?r=${id}`)
      .then((Response) => {
        console.log("Response from server", Response.data?.data);
        // console.log(Response.data?.data[0]?.restaurant[0]?.name);
        // console.log(Response.data?.data?.restaurant[0]?.name);
        setShopName(Response.data?.data?.restaurant[0]?.name);
        setMenu_type(Response.data?.data?.menu_type);
        setImgLink(Response.data?.data?.arr_links?.menuitem_image);
        setSpcLink(Response.data?.data?.arr_links?.menuitem_icons);
        // caller(0);
        // setList(menu_type[0]?.list);
        // caller(0);
        // if (menu_type.length !== 0) {
        //   console.log("hi");
        // }
      });
    // .then(() => {
    //   addTodo();
    // });
  }, []);

  // const addTodo = useCallback(() => {
  //   console.log(menu_type);
  // }, [menu_type]);

  useEffect(() => {
    // caller(0);
    console.log("menu Appred", menu_type);
    if (menu_type.length !== 0) {
      console.log("hi");
      caller(0);
    }
  }, [menu_type]);

  // caller(0);
  return (
    <div style={{ backgroundColor: Dark ? "#353535" : "white" }}>
      {/* <div> */}
      <Container
        style={{
          // marginTop: 20,

          // width: 430,
          // borderColor: "black",
          // backgroundColor: Dark ? "black" : "white",
          // borderRadius: 5,
          // border: "0.5px solid #888888",
          // boxShadow: "0px 1px 8px #888888",
          flex: 1,
        }}
      >
        <ScrollMenu>
          {menu_type.map((item, index) => (
            <div
              className="wrap"
              style={{
                backgroundColor: "black",
                textDecorationLine: "underline",
                borderBottomColor: Index == index ? "orange" : "#d0d0d0",
                borderWidth: 10,
                cursor: "pointer",
              }}
              // onClick={caller(0)}
              onClick={() => {
                caller(index);
              }}
            >
              <div>
                <p
                  style={{
                    color: Index == index ? "orange" : "#d0d0d0",
                    paddingLeft: 5,
                    paddingRight: 5,
                    fontWeight: "bold",
                    // fontFamily: "Trirong",
                    fontSize: 17,
                  }}
                >
                  {item?.t}
                </p>
              </div>
              {/* <div style={{ width: 5, height: 5, backgroundColor: "red" }}></div> */}
            </div>
          ))}
        </ScrollMenu>
      </Container>
      {/* </div> */}

      {List?.length == 0 ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ color: "red" }}>Please Select a tab!!</p>
        </div>
      ) : (
        <div></div>
      )}

      <div>
        {List.map((item, key) => {
          return (
            <Container
              // maxWidth="md"
              style={{
                marginTop: 20,
                // height: 350,
                width: 350,
                borderColor: "black",
                backgroundColor: Dark ? "black" : "white",
                borderRadius: 5,
                border: "0.5px solid #888888",
                boxShadow: "0px 1px 8px #888888",
                flex: 1,
              }}
            >
              <div style={{ display: "flex", flex: 1 }}>
                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <img
                    src={`${ImgLink}${item?.img}`}
                    alt="content Image"
                    style={{
                      width: 318,
                      height: 180,
                      marginTop: 10,
                      marginLeft: -1,
                      marginBottom: 5,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flex: 1,
                      // backgroundColor: "pink",
                    }}
                  >
                    <div
                      className="veg"
                      style={{
                        height: 20,
                        width: 20,
                        backgroundColor: item?.vegid == 1 ? "green" : "red",
                        borderWidth: 5,
                      }}
                    />
                    <p
                      style={{
                        fontSize: 25,
                        color: Dark ? "#E2E4E6" : "black",
                        marginLeft: 8,
                        marginTop: -2,
                        fontFamily: "Inter",
                      }}
                    >
                      {item?.name}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        // justifyContent: "flex-end",
                        position: "absolute",
                        marginLeft: 290,
                        // right: 1,
                      }}
                    >
                      <img
                        src={`${SpcLink}/spiceid${item?.spiceid}.png`}
                        style={{
                          width: 30,
                          height: 30,
                          // marginLeft: 150,
                          alignItems: "flex-end",
                        }}
                      />
                    </div>
                  </div>
                  <p
                    style={{
                      color: Dark ? "#c9c8c4" : "#808080",
                      // marginLeft: 10,
                      marginTop: -10,
                    }}
                  >
                    {item?.description}{" "}
                    {/* {ItemCounter(item?.id, item?.name, item?.price)} */}
                  </p>
                  <div style={{ display: "flex" }}>
                    {/* <p
                      style={{
                        color: Dark ? "white" : "black",
                        marginLeft: 10,
                      }}
                    >
                      {item?.ingredients}
                    </p> */}
                    <p
                      style={{
                        color: "grey",
                        fontWeight: "bold",
                        marginLeft: -10,
                        display: "flex",
                      }}
                    >
                      INR{" "}
                      <p
                        style={{
                          marginTop: -0.5,
                          marginLeft: 2,
                          color: "#f17728",
                        }}
                      >
                        {item?.price}/-
                      </p>
                    </p>

                    <div style={{ marginLeft: 160, display: "flex" }}>
                      <div
                        style={{
                          height: 20,
                          width: 30,
                          backgroundColor: "grey",
                          borderRadius: 5,
                          marginTop: 15,

                          cursor: "pointer",
                        }}
                        onClick={() => {
                          OrderReducer(item?.id, item?.name, item?.price);
                        }}
                      >
                        <p
                          style={{
                            marginTop: -0.5,
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            marginLeft: 10,
                          }}
                        >
                          -
                        </p>
                      </div>
                      <div
                        style={{
                          height: 20,
                          marginLeft: 5,
                          marginRight: 5,
                          // width: 80,
                          backgroundColor:
                            ItemCounter(item?.id, item?.name, item?.price) !== 0
                              ? "green"
                              : "grey",
                          borderRadius: 5,
                          marginTop: 15,

                          cursor: "pointer",
                        }}
                        onClick={() => {
                          OrderReceiver(item?.id, item?.name, item?.price);
                        }}
                      >
                        {/* <p style={{ color: "white" }}>-</p> */}
                        <p
                          style={{
                            marginTop: -0.5,
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            paddingLeft: 5,
                            paddingRight: 5,
                            // marginLeft: 5,
                          }}
                        >
                          {ItemCounter(item?.id, item?.name, item?.price)}
                        </p>
                      </div>

                      <div
                        style={{
                          height: 20,
                          width: 30,
                          backgroundColor: "grey",
                          borderRadius: 5,
                          marginTop: 15,

                          cursor: "pointer",
                        }}
                        onClick={() => {
                          OrderReceiver(item?.id, item?.name, item?.price);
                        }}
                      >
                        <p
                          style={{
                            marginTop: -0.5,
                            color: "white",
                            fontWeight: "bold",
                            textTransform: "none",
                            marginLeft: 10,
                          }}
                        >
                          +
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          );
        })}
      </div>
      <Divider style={{ marginTop: 20 }} />
    </div>
  );
};

export default NewsContent;
