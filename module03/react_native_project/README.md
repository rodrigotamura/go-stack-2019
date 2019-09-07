# Introduction

If you prefer, you can read some introductory concepts [right here](./1562003727785.pdf).

# Preparing our development environment

Please, you can check out how to prepare the development environment [here](https://docs.rocketseat.dev/).

# Creating project

There are many ways to install a React Native project, however we will use **react-native-community/cli**:

`$ yarn add project_name` or `$ npx react-native init project_name` (if you do not want to install react-native-cli globally).

### Initializing app

After created the project, with your emulator or device connected by USB, you can run `react-native run-android`.

# ESLint, Prettier and EditorConfig

### EditorConfig

Please, [check out here](https://github.com/rodrigotamura/go-stack-2019/tree/master/module03/react-first-project#editorconfig).

### ESLint

**Normally .eslintrc.js is already created within RN (REact Native) project.**

### ESLint

It's very important to standardize our code in order to not mess it up and harm the future maintenances.

That's why we will implement an auto standardize in our project's code whit **eslint**:

```
$ yarn add eslint -D
```

List is a feature that check our code and fix everything out of standard automatically.

With the follow command ESlint will check our code for standardize mistakes:

```
$ yarn eslint --init
```

And we will select the follow options:

1. To check syntax, find problems, and enforce code style
2. Javascript modules (import/export)
3. React
4. Uncheck _Browser_ and _Node_
5. Use a popular style guide
6. Airbnb
7. Javascript
8. Confirm the installation

After installation you can remove `package-lock.json` from root of project, because we are using Yarn. And run `$ yarn` in order to update our dependencies into _yarn.lock_.

### Prettier

It will bealty our code automatically.

```
$ yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

_eslint-config-prettier_ and _eslint-plugin-prettier_ are packages that will integrate ESlint with Prettier. With _babel-eslint_ we are saying to ESLint that we are using the latest versions of Babel and latest functionalities of ESLint.

Now let's open _.eslintrc.js_ and change or add the follow metadatas:

```
extends: ['airbnb-base', 'prettier', 'prettier/react'],
parser: "babel-eslint", // this is before parserOptions
plugins: ["react", "prettier"],
rules: {
  "prettier/prettier": "error",
  "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
  "import/prefer-default-export": "off"
},
```

By default, AirBNB standardize will require to use **JSX** file extension if we want code a React file. Note that `react/jsx/filename-extension` is setting a rule that ESLint will not throw any error if we use **.js** files for React codes instead JSX extension.

`"import/prefer-default-export": "off"` we are disabling a rule that oblige us export as default, because in our project we will have exports that are not default.

If you test saving some JS file from your project, you will realize that everything that use double quotes ('), that is a patter we will adopt (AirBNB), will be changed to single quotes ('), because within _extends_ from _.eslintrc.js_ there is a conflict between _airbnb-base_ and _prettier_.

To fix it we will create another file in our root called **.prettierrc** to adopt only single quotes. Implement the follow content:

**.prettierrc is already created on creating RN project, but named as _.prettierrc.js_**

```
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
};
```

### Re-run again React Native project

For all this implementation it is important to restart the RN project in your emulator or device:

`$ react-native start --reset-cache`
(_Note: in many cases of issues caused by something are solved running wether command above or `$ react-native run-android`_).

# Configuring Reactotron

[Reactotron](https://github.com/infinitered/reactotron) is a debugger. Please install following instructions from [this link](https://github.com/infinitered/reactotron/blob/master/docs/quick-start-react-native.md) and download the desktop app [right here](https://github.com/infinitered/reactotron/blob/master/docs/installing.md). You need to choose the first one that is NOT beta.

After installed, run the command `$ yarn add reactotron-react-native`.

Create [/src/index.js](./src/index.js). Transfer the content from `/App.js` into this created file and exclude `/App.js`.

Go to [./index.js](./index.js) and apply the following changes:

```javascript
/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src'; <----
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

Now, create [./src/config/ReactotronConfig.js](./src/config/ReactotronConfig.js), and open it for further implementations. You will se that `__DEV__` global variable is not recognized by ESLint, that's why is showing an error. T fix it open [.eslintrc.js](./eslintrc.js) and add:

```javascript
globals: {
  Atomics: 'readonly',
  SharedArrayBuffer: 'readonly',
  __DEV__: 'readonly',
},
```

Now, in [/src/index.js](./src/index.js) let's include the configuration of Reactotron.

### Testing Reactotron

Open Reactotron Desktop and running your emulator or device, reload the application (shake device and reload).

If you are using Android, we need implement some extra configurations:

Open [/src/config/ReactotronConfig.js](./src/config/ReactotronConfig.js) and add this configuration:

```javascript
const tron = Reactotron.configure({ host: '<your-ip>' })
  .useReactNative()
  .connect();
```

If your Reactotron Desktop is not showing anything yet, you will need to make a port redirection with **ADB**:

1. Take off the last implemented code in [/src/config/ReactotronConfig.js](./src/config/ReactotronConfig.js):

```javascript
const tron = Reactotron.configure()
  .useReactNative()
  .connect();
```

2. Run command `$ adb reverse tcp:9090 tcp:9090`

# React Navigation

Let's create [/src/pages/Main/index.js](./src/pages/Main/index.js) and [/src/pages/User/index.js](./src/pages/User/index.js).

Within `/src/pages` we will store every component pages.

Create also [/src/routes.js](./src/routes.js) and install `$ yarn add react-navigation react-native-gesture-handler react-native-reanimated`

- **react-native-gesture-handler** deals with gestures in our app;
- **react-native-reanimated** deals with animations when user go to another page.

### Extra configs for Android devices

We need also need to add some code lines inside [/android/app/src/main/java/com/react_native_project/MainActivity.java](./android/app/src/main/java/com/react_native_project/MainActivity.java) and change into:

```java
package com.react_native_project;

import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "react_native_project";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new ReactActivityDelegate(this, getMainComponentName()) {
        @Override
        protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView(MainActivity.this);
        }
      };
    }
}

```

We need to run again `$ yarn react-native run-android` in order to compile this changed Java file again.

### Extra configs for iOS

It is necessary only run `$ pod install` in order to make installations in native codes.

If some error happened, you will need to install [Cocoapods](https://cocoapods.org)

Please run `$yarn react-native run-ios`

### Preparing routes

Open [/src/routes.js](./src/routes.js) and see implementations there.

(If you want to use createStackNavigator, you will need install separated `$ yarn add react-navigation-stack` and import it).

You need now to import `routes.js` into [/src/index.js](./src/index.js) and add some extra configurations there.

# Configuring Statusbar

Statusbar is that place where is placed clock, battery status, and so on. We can set some styles there.

We can import `StatusBar` from `react-native` lib. You can see the implementation in [/src/index.js](./src/index.js).

Note: `StatusBar` is a React NAtive component.

# Styled components

You can see installation [here](https://github.com/rodrigotamura/go-stack-2019/tree/master/module03/react-first-project#styled-components).

One of the biggest diferences from ReactJS (web) is that:

- We must import from `styled-component\**native**`;
- We must not use div, p, h1, h2, or another HTML tag.
- We might not make chained stylization

Remembering that each component is setted to use flexbox by default.

**We cannot** set global stylization in our App, we only can create stylized components and share with while application.

# Issues

If you are a Ubuntu user, and when you are trying to test your RN code and return this error:

```
fs.js:1431
    throw error;
    ^

Error: watch /home/fooBar/dev/blah/lib/tools/testing/node_modules/core-js/modules ENOSPC
    at exports._errnoException (util.js:1022:11)
    at FSWatcher.start (fs.js:1429:19)
    at Object.fs.watch (fs.js:1456:11)
    at NodeWatcher.watchdir (/home/fooBar/.config/yarn/global/node_modules/sane/src/node_watcher.js:148:20)
    at Walker.<anonymous> (/home/fooBar/.config/yarn/global/node_modules/sane/src/node_watcher.js:361:12)
    at emitTwo (events.js:106:13)
    at Walker.emit (events.js:191:7)
    at /home/fooBar/.config/yarn/global/node_modules/walker/lib/walker.js:69:16
    at go$readdir$cb (/home/fooBar/.config/yarn/global/node_modules/graceful-fs/graceful-fs.js:149:14)
    at FSReqWrap.oncomplete (fs.js:123:15)
```

Try to run the follow command and try again.

`$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
