module.exports = {
  transform: {
    '\\.js$': ['babel-jest'],
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  snapshotSerializers: ["jest-serializer-vue"],
};
