// Copyright 2017-2021 @polkadot/ui authors & contributors
// SPDX-License-Identifier: Apache-2.0

const base = require('@polkadot/dev/config/babel-config-cjs.cjs');

module.exports = Object.keys(base).reduce((config, key) => {
  config[key] = base[key];

  presets: [
    ["@babel/preset-env", {
      "targets": {
        "browsers": ["last 1 chrome version"]
      }
    }]
  ]
  return config;
}, {});
