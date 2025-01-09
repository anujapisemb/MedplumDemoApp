import { registerRootComponent } from 'expo';
import App from './App';
if (__DEV__) {
    require("../ReactotronConfig");
  }
export default registerRootComponent(App);
