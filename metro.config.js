const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const { withNativeWind } = require("nativewind/metro");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = mergeConfig(getDefaultConfig(__dirname), {
  /* your custom config */
});

// Apply NativeWind and Reanimated configs
const finalConfig = withNativeWind(config, { input: "./global.css" });
module.exports = wrapWithReanimatedMetroConfig(finalConfig);
