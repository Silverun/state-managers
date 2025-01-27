import { NavigationContainer } from "@react-navigation/native";
import { RootNavigation } from "./navigation";
import "../global.css";
import { Provider } from "react-redux";
import { reduxStore } from "./store/redux";

export default function App() {
  return (
    <Provider store={reduxStore}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
}
