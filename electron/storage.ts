import Store from 'electron-store';

interface ModuleItem {
  learn: string;
  finished: string[];
}

interface AppData {
  module: ModuleItem[];
  quiz: any[];
}

const store = new Store<AppData>({
  name: 'app-data',     // file becomes app-data.json
  defaults: {
    module: [
      { learn: 'letter', finished: [] },
      { learn: 'word', finished: [] }
    ],
    quiz: []
  }
});

export default store;