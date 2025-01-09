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
2. In [`Home.tsx`](./src/Home.tsx): Update your `projectId` from medplum.


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
You can set communiation criteria In [`Home.tsx`](./src/Home.tsx#L87) as Communication?recipient=Patient/${patientId} to get communication related to patient received on the specified communication criteria

# Testing communication 
You can import below curl into postman to send communication to patient

  ```bash
   curl --location ‘<baseurl>/fhir/R4/Communication' \
   --header 'accept: application/fhir+json, */*; q=0.1' \
   --header 'accept-language: en-US,en;q=0.9' \
   --header 'authorization: Bearer <bearerToken> \
   --header 'cache-control: max-age=0' \
   --header 'content-type: application/fhir+json' \
   --header 'origin: http://localhost:3000' \
   --header 'priority: u=1, i' \
   --header 'referer: http://localhost:3000/' \
   --header 'sec-ch-ua: "Chromium";v="130", "Google Chrome";v="130", "Not?A_Brand";v="99"' \
   --header 'sec-ch-ua-mobile: ?1' \
   --header 'sec-ch-ua-platform: "Android"' \
   --header 'sec-fetch-dest: empty' \
   --header 'sec-fetch-mode: cors' \
   --header 'sec-fetch-site: cross-site' \
   --header 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Mobile Safari/537.36' \
   --header 'x-medplum: extended' \
   --data '{
      "resourceType": "Communication",
      "status": "in-progress",
      "sender": {
         "reference": "Practitioner/<practitionerId>”,
         "display": "<practitionerName>"
      },
      "recipient": [
         {
               "reference": "Patient/<patientId>”,
               "display":"<patientName>"
         }
      ],
      "sent": "2024-12-03T10:40:39.854Z",
      "payload": [
         {
               "contentString": “Hello, how are you? ”
         }
      ]
   }'
   ```

While testing this communication functionality, CommunicationReceived count will get increased when patient received a message from pratitioner





