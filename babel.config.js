module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin', // Must be first
    'nativewind/babel', 
    // ['module:react-native-dotenv'],  // Explicitly define the plugin here
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};