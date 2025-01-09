# Medplum React Native Example

This is a basic starter app that demonstrates how to sign into Medplum and subscibe to communication with React Native.

This only demonstrates React Native in "web" mode. Android and iOS are out of scope.

## Setup

Clone and run this project:

```bash
git clone git@github.com:medplum/medplum-react-native-example.git
cd medplum-react-native-example
npm run start
```



1. In [`App.tsx`](./src/App.tsx#L6-L20): Update your `baseUrl`.
2. In ['Home.tsx](./src/Home.tsx): Update your `projectId` from medplum.


### Android Emulator

1. Follow [these instructions](https://docs.expo.dev/workflow/android-studio-emulator/) to download Android Studio and set up an emulated device
2. Run
   ```bash
   npm run android
   ```


### iOS Emulator

1. Follow [these instructions](https://docs.expo.dev/workflow/ios-simulator/) to download Xcode and set up an emulated device
2. Follow [these instructions](https://developer.apple.com/documentation/safari-developer-tools/adding-additional-simulators) to add an iOS device to your simulator
3. Run
   ```bash
   npm run ios
   ```


## Medplum Login

This app includes a very basic sign-in form that only supports email and password.

# Medplum communication
You can set communiation criteria In Home.tsx (./src/App.tsx#L91) as Communication?recipient=Patient/${patientId} to get communication related to patient received on the specified communication criteria
While testing this functionality CommunicationReceived count will get increased when patient received a message from pratitioner





