import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  // __DEV__ is a global variable that returns true if user is emulating
  // the app in an develop environment
  // So, everything that is within this scope will not run in production environment.

  const tron = Reactotron.configure()
                  .useReactNative()
                  .connect();

  // we are getting the global variable `console` and creating new property called tron
  // so we can call this command now in order to use Reactotron for debugging tool
  console.tron = tron;

  // cleaning the timeline every moment that we refresh our application
  tron.clear();
}
