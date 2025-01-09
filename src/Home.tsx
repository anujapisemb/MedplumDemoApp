import { LoginAuthenticationResponse, getDisplayString, sleep } from '@medplum/core';
import { Patient } from '@medplum/fhirtypes';
import { useMedplum, useMedplumContext, useMedplumProfile, useSubscription } from '@medplum/react-hooks';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import CustomButton from './CustomButton';

export default function Home(): JSX.Element {
  const medplum = useMedplum();
  const profile = useMedplumProfile();
  const { loading } = useMedplumContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function startLogin(): void {
    medplum
      .startLogin({
        email,
        password,       
        projectId: '<projectId>',
        remember: false,
        scope: 'offline',
      })
      .then(handleAuthResponse)
      .catch(console.error);
  }

  function handleAuthResponse(response: LoginAuthenticationResponse): void {
    if (response.code) {
      medplum.processCode(response.code).catch(console.error);
    }
    if (response.memberships) {
      // TODO: Handle multiple memberships
      // In a real app, you would present a list of memberships to the user
      // For this example, just use the first membership
      medplum
        .post('auth/profile', {
          login: response.login,
          profile: response.memberships[0].id,
        })
        .then(handleAuthResponse)
        .catch(console.error);
    }
  }

  function signOut(): void {
    medplum.signOut().catch(console.error);
  }


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text style={styles.title}>Medplum React Native Example</Text>
          {!profile ? (
            <View style={styles.formWrapper}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#003f5c"
                  onChangeText={(email) => setEmail(email)}
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#003f5c"
                  secureTextEntry={true}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
              <CustomButton onPress={startLogin} title="Sign in" />
            </View>
          ) : (
            <View style={styles.authedWrapper}>
              <Text style={styles.loginText}>Logged in as {getDisplayString(profile)}</Text>
              <CustomButton onPress={signOut} title="Sign out" />
              <View style={styles.marginTop10}>
                <NotificationsWidgit
                  title="Communication Received:"
                  criteria={`Communication`}
                />
              </View>
            </View>
          )}
          <StatusBar style="auto" />
        </>
      )}
    </View>
  );
}

interface NotificationsWidgitProps {
  title?: string;
  criteria: string;
}

function NotificationsWidgit(props: NotificationsWidgitProps): JSX.Element {
  const [notifications, setNotifications] = useState(0);
  const [reconnecting, setReconnecting] = useState(false);
  const medplum = useMedplum();

  useSubscription(
    props.criteria,
    (data) => {
      console.log('message received',JSON.stringify(data));
      

      setNotifications(notifications + 1);
    },
    {
      onWebSocketClose: useCallback(() => {
        setReconnecting(true);
      }, []),
      onWebSocketOpen: useCallback(() => {
        if (reconnecting) {
          setReconnecting(false);
        }
      }, [reconnecting]),
      onSubscriptionConnect: useCallback(async (subscriptionId: any) => {
        console.log('subscriptionId', subscriptionId);
        try {
          sleep(3000);
          // let subscriptionRes = await medplum.searchResources('Subscription', `author=Patient/78f5bb86-db26-46ff-8876-3e2586bfd25f`);
          // console.log('Subscription', subscriptionRes);
          // let websocket =  await medplum.getSubscriptionManager()
          // console.log('websocket', websocket);
          let subscriptionRes = await medplum.readResource('Subscription', subscriptionId);
          console.log('subscriptionRes', JSON.stringify(subscriptionRes));
        } catch (error) {
          console.log('Error ', error);
        }
      }, []),
    }
  );

  function clearNotifications(): void {
    setNotifications(0);
  }

  return (
    <View style={styles.marginTop10}>
      <Text>
        {props.title ?? 'Notifications:'} {notifications}
      </Text>
      <Text>Reconnecting: {reconnecting.toString()}</Text>
      <CustomButton onPress={clearNotifications} title="Clear" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
  },
  loginText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  formWrapper: {
    marginTop: 10,
  },
  authedWrapper: {
    marginTop: 10,
    height: '60%',
  },
  input: {
    minWidth: 200,
    height: 40,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#ced4da',
    color: '#212529',
    marginBottom: 10,
    borderRadius: 6,
  },
  marginTop10: {
    marginTop: 10,
  },
  scrollView: {
    marginTop: 20,
    width: 250,
    paddingHorizontal: 5,
  },
  name: {
    textAlign: 'center',
    marginBottom: 2,
    color: '#212529',
    borderStyle: 'solid',
    borderColor: '#ced4da',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
});
