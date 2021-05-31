const lodash = require('lodash')

module.exports = {
  moduleNameMapper: {
    underscore$: 'lodash',
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",

    ".+\\.(css|styl|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js"
  },
  globals: {
    '_': lodash
  },
  setupFiles: ["./setup-jest.js"]
}

