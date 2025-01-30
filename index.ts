import { registerRootComponent } from "expo";

import App from "./app/App";
// prettier-ignore
if (!new class { x }().hasOwnProperty('x')) throw new Error('Transpiler is not configured correctly');

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
