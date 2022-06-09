import Pages from "./pages";

// REDUX SETUP
import { Provider } from "react-redux";
import store from "./store";

// Material
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3772ff',
    },
    secondary: {
      main: '#edeff2',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Pages />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
