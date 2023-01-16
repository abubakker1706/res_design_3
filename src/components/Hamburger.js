import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ApiCaller from "../ApiCaller/ApiCaller";
import { ThemeProvider, createTheme } from "@mui/material/styles";
// import axios from "axios";
import "./NavQuana.css";
import { Values } from "../Context/ContextTab";
export default function Hamburger() {
  const { Dark } = React.useContext(Values);
  const [state, setState] = React.useState({
    left: false,
  });

  const [lang, setLang] = React.useState(0);

  const darkTheme = createTheme({
    palette: {
      mode: Dark ? "dark" : "light",
    },
  });

  // React.useEffect(() => {
  //   ApiCaller(
  //     "sports"
  //   ).then((Response) => {
  //     console.log(Response.data);
  //   });
  // }, []);

  const categoryCaller = (category) => {
    ApiCaller(category).then((response) => {
      console.log(response);
    });
    console.log(category);
  };

  // React.useEffect(() => {
  //   axios
  //     .get(
  //       "https://newsapi.org/v2/top-headlines?country=in&apiKey=1d4d9b16de1d422584fc0290366bbcda"
  //     )
  //     .then((response) => {
  //       console.log(response.data);
  //     });
  // }, []);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div
        className="lang"
        style={{
          // marginTop: 50,
          width: 120,
          height: 30,
          border: "0.5px solid #888888",
          margin: 40,
          marginLeft: 60,
          cursor: "pointer",
        }}
      >
        {/* <Button style={{ fontWeight: "bold", color: "red" }}>English</Button>
        <Button style={{ fontWeight: "bold" }}>Hindi</Button> */}

        <div
          style={{
            width: 60,
            height: 30,
            backgroundColor: lang == 0 ? "#f6b022" : "#fffff",
          }}
          onClick={() => {
            setLang(0);
          }}
        >
          <p
            style={{
              color: Dark ? "white" : "black",
              fontWeight: "bold",
              fontSize: 13,
              justifyContent: "center",
              display: "flex",
              margin: 5,
            }}
          >
            English
          </p>
        </div>
        <div
          style={{
            width: 60,
            height: 30,
            backgroundColor: lang == 1 ? "#f6b022" : "#fffff",
          }}
          onClick={() => {
            setLang(1);
          }}
        >
          <p
            style={{
              color: Dark ? "white" : "black",
              fontWeight: "bold",
              fontSize: 13,
              margin: 6,
              justifyContent: "center",
              display: "flex",
            }}
          >
            हिंदी
          </p>
        </div>
      </div>

      <Divider />
      <p
        style={{
          color: Dark ? "white" : "black",
          marginLeft: 60,
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        Categories
      </p>
      <Divider />
      <List>
        {[
          // "India",
          // "World",
          // "Politics",
          // "Business",
          // "Finance",
          // "Startup",
          // "Education",
          // "Science",
          // "Technology",
          // "Sports",
          // "Entertainment",
          // "Miscellaneous",
          "business",
          "entertainment",
          "general",
          "health",
          "science",
          "sports",
          "technology",
        ].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton //onClick={categoryCaller(text)}
            >
              <ListItemText
                onClick={() => categoryCaller(text)}
                primary={text}
                style={{
                  color: Dark ? "white" : "black",
                  marginLeft: 50,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <Button onClick={toggleDrawer(anchor, true)}>
            <img
              style={{ cursor: "pointer", marginLeft: 5 }}
              src={
                Dark
                  ? require("../assets/menu_white.png")
                  : require("../assets/menu.png")
              }
              width="20px"
              alt="menu"
            />
          </Button> */}
          <ThemeProvider theme={darkTheme}>
            {/* <CssBaseline /> */}
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </ThemeProvider>
        </React.Fragment>
      ))}
    </div>
  );
}
