import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: "React Native Example",
  })
  .useReactNative({
    asyncStorage: true, // there are more options to the async storage.
    editor: true, // there are more options to editor
    overlay: true, // just turning off overlay,
    errors: true,
    devTools: true,
    networking: true,
    log: true
  })
  .connect();

  // Add this line to see WebSocket logs in Reactotron
Reactotron.onCustomCommand({
  command: 'ws-log',
  handler: () => console.tron.log('WebSocket logs enabled'),
});