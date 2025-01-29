import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Redux } from "../components/redux/Redux";
import { Zustand } from "../components/zustand/Zustand";
import { MobX } from "../components/MobX";

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
