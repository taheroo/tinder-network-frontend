import React from "react";
import Dashboard from "./containers/Dashboard";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global";
import { lightTheme } from "./styles/theme";
// Define what props.theme will look like
// const theme = {
//   main: "mediumseagreen",
// };

// Use Context: https://www.toptal.com/react/react-context-api#:~:text=What%20is%20context%20in%20React,parent%20to%20child%20via%20props).
// Routes should be used in App
const App = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Dashboard />
    </ThemeProvider>
  );
};

export default App;
