import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@mui/system";
import "./Content.css";

import axios from "axios";
import Divider from "@mui/material/Divider";
import { Values } from "../../Context/ContextTab";
import ApiCaller from "../../ApiCaller/ApiCaller";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import Button from "@mui/material/Button";
import { CompressOutlined, Margin } from "@mui/icons-material";
// import { listClasses } from "@mui/material";
import { FloatingButton, Item } from "react-floating-button";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Card from "../../Card/Card";
const NewsContent = () => {
  const [Index, setIndex] = useState(null);
  const [menu_type, setMenu_type] = useState([]);
  const [List, setList] = useState([]);
  const { Dark } = React.useContext(Values);
  const { ShopName, setShopName } = React.useContext(Values);
  const { Orders, setOrders } = React.useContext(Values);
  const [ImgLink, setImgLink] = useState("");
  const [SpcLink, setSpcLink] = useState("");
 
  const [isVisible, setIsVisible] = useState(true);
  const [currentListIndex, setCurrentListIndex] = useState(0);
  

  const caller = (index) => {
    setList(menu_type[index]?.list);
   
    console.log(menu_type, index);
    setIndex(index);
    setCurrentListIndex(index);
  
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

  //caller(0);
  const handleClick = () => {
    setIsVisible(!isVisible);
  }
  return (
    <div className="main">
    
      {/* <div> */}
      <div className="shopname">
      {ShopName}
      </div>
      
      <div className="wrap-container"  >
     
          {menu_type.map((item, index) => (
        
           <ul className="listWrap" style={{
               color: Index == index ? "orange" : "#d0d0d0",
           }}>
           <li onClick={()=>{caller(index);handleClick()}} className="itemList" 
            style={{
                
                
             
                borderWidth: 10,
                cursor: "pointer",
            
              
              }}> {item?.t}</li>
           
           </ul>
          
          ))}
          {List?.length == 0 ? (
        
        
        <p style={{ color: "red" , display: "flex",
          justifyContent: "center",
          alignItems: "center",}}>Please Select a tab!!</p>
     
    ) : "" }
          </div>
          
     
     
      {/* </div> */}

     
    {<div style={{
         
          display:"flex",
           alignItems:"center",
           justifyContent:"center",
           flexDirection:"column",
       
          margin:"0px"

        }}>
     
      <div className="list"  style={{}}  >
        {List.map((item, key) => {
          return (
          
             
        <React.Fragment key={item}>
              <div className="all-list">
                {/* <div style={{display:"flex", alignItems:"flex-start",justifyContent:"flex-start"}}>
                  <img
                    src={`${ImgLink}${item?.img}`}
                    alt="content Image"
                    style={{
                      width: "230px",
                      
                      height: 180,
                    
                      
    
                     
                      

                      
                      
                    }}
                  />
                  </div> */}
                  <div style={{display:"flex", alignItems:"flex-start",justifyContent:"flex-start",flexDirection:"column"}}>
                    <div style={{display:"flex",alignItems:"center" ,gap:"0.5rem"}}>
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
                        fontSize: 18,
                        color: Dark ? "#E2E4E6" : "black",
                    

                        fontFamily: "Inter",
                      }}
                    >
                      {item?.name}
                    </p>
                    
                    </div>
                     
                   
                    <div >
                  <p
                    style={{
                      color: Dark ? "#c9c8c4" : "#808080",
                      // marginLeft: 10,
                      display:"flex",
                      fontSize:18
                    
                    }}
                  >
                    {item?.description}{" "}
                    <img
                        src={`${SpcLink}/spiceid${item?.spiceid}.png`}
                        style={{
                          width: 30,
                          height: 30,
                          // marginLeft: 150,
                          
                        }}
                      />
                    {/* {ItemCounter(item?.id, item?.name, item?.price)} */}
                  </p>
                  </div>
                  
                  
                
                    {/* <p
                      style={{
                        color: Dark ? "white" : "black",
                        marginLeft: 10,
                      }}
                    >
                      {item?.ingredients}
                    </p> */}
                    <div style={{display:"flex" ,alignItems:"center",gap:".5rem"}}>
                    <p
                      style={{
                        color: "grey",
                        fontWeight: "bold",
                        
                     
                      }}
                    >  </p>
                      INR{" "}
                      <p
                        style={{
                          
                          color: "#f17728",
                          fontWeight: "bold",
                        }}
                      >
                        {item?.price}/-
                      </p>
                      </div>
</div>
                      {/* <div style={{display: "flex", alignItems: "center", marginTop: 10}}>
                      <div
                       
                        onClick={() => {
                          OrderReducer(item?.id, item?.name, item?.price);
                        }}
                        style={{
        height: 20,
        width: 20,
        backgroundColor: "grey",
        borderRadius: 5,
        marginRight: 10,
        cursor: "pointer",
      }}
                      >
                        <p
                          style={{
                            color: "white", fontWeight: "bold"
                          }}
                        >
                          -
                        </p>
                      </div>
                      </div> */}
                    

                      {/* <div
                        
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
                      </div> */}
                   
              
                      <hr style={{width:"100%"}}/>
              </div>
              
              
      
              </React.Fragment>
             
          
          );
        
        }
      
        )
        
        }
        
       
        </div>
        
    
       
     
       
    
        
      
      {/* { show && <Button onClick={()=>setShow(false)} style={{
        color: Dark ? "orange":'black',
        fontSize:13,
        fontWeight:800,
        height:"30px",
        width:"300px",

      
        position: 'sticky',
        bottom:0,
        display: "flex",
        margin :"auto",
  
  
  

        
       
        backgroundColor: Dark? "black" : "orange",
      }}>back</Button>} */}
      </div>}
     
      
      <Divider style={{ marginTop: 20 }} />
    
    </div>
  );
};    

export default NewsContent;

// {/* <div style={{display: "flex",  alignItems: "center",justifyContent:"center" ,gap:"1rem"}}>
// <p
//     style={{
//       color: "orange", fontWeight: "bold",
//       cursor: "pointer"
//     }}
     
//   onClick={() => {
//     OrderReducer(item?.id, item?.name, item?.price);
//   }}
//   >
//     -
//   </p>
// <div
//   style={{
//     height: 20,
   
//     // width: 80,
//     backgroundColor:
//       ItemCounter(item?.id, item?.name, item?.price) !== 0
//         ? "green"
//         : "grey",
   
//     cursor: "pointer",
//   }}
//   onClick={() => {
//     OrderReceiver(item?.id, item?.name, item?.price);
//   }}
// >
//   {/* <p style={{ color: "white" }}>-</p> */}
//   <p
//     style={{
//       marginTop: -0.5,
//       color: "white",
//       fontWeight: "bold",
//       textTransform: "none",
//       paddingLeft: 5,
//       paddingRight: 5,
//       // marginLeft: 5,
//     }}
//   >
//     {ItemCounter(item?.id, item?.name, item?.price)}
//   </p>
  
// </div>
// <p
//     style={{
      
//       color: "orange",
//       fontWeight: "bold",
//       cursor: "pointer"
     
//     }}
//     onClick={() => {
//     OrderReceiver(item?.id, item?.name, item?.price);
//   }}
//   >
//     +
//   </p>
// </div>
//  */}