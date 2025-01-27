import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Redux } from "../components/Redux";
import { Zustand } from "../components/Zustand";
import { MobX } from "../components/MobX";
import { Provider } from "react-redux";
import { reduxStore } from "../store/redux";

const Tabs = createBottomTabNavigator();

export function RootNavigation() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Redux" component={Redux} />
      <Tabs.Screen name="Zustand" component={Zustand} />
      <Tabs.Screen name="Mobx" component={MobX} />
    </Tabs.Navigator>
  );
}
