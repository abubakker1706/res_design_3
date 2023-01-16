import axios from "axios";
import React from "react";
// import { Values } from "../Context/ContextTab";

// const version = "hRs6";
// const user = 30;
const BASE_URL = `https://www.thequana.com/apimobile/menumaster?r=3`;
// const ApiCaller = (body) => {
const ApiCaller = () => {
  // const { RestId } = React.useContext(Values);
  // console.log("BODY RECEIVED AT APICALLER", RestId);
  // const BASE_URL = `https://www.thequana.com/apimobile/menumaster?r=${3}`;

  const requestOptions = {
    method: "GET",
  };

  return axios(BASE_URL, requestOptions);
  //return axios.post(BASE_URL, {
  // xversion: "hRs6",
  // xuserid: 30,
  // xaction: "posts",
  // xtype: "menu",
  // xtag: "today",
  // });
};

export default ApiCaller;
