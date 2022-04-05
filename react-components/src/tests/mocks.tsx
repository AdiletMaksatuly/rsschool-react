export const fakeLocalStorage = (function () {
  let store: { [key: string]: string } = {
    searchQuery: 'random text',
  };

  return {
    getItem: jest.fn((key: string) => {
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// export const fakeLocalStorage = (function () {
//   let store: { [key: string]: string } = {};

//   return {
//     getItem: function (key: string) {
//       return store[key] || null;
//     },
//     setItem: function (key: string, value: string) {
//       store[key] = value.toString();
//     },
//     removeItem: function (key: string) {
//       delete store[key];
//     },
//     clear: function () {
//       store = {};
//     },
//   };
// })();
