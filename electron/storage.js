import Store from 'electron-store';

const store = new Store({
  name: 'app-data',     // file becomes app-data.json
  defaults: {
    module: [
      {
        learn: 'huruf',
        finished: []
      },
      {
        learn: 'angka',
        finished: []
      }
    ]
  }
});

export default store;