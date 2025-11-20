export {}

declare global {
  interface Window {
    ipcRenderer: {
      on: (...args: any[]) => void
      off: (...args: any[]) => void
      send: (...args: any[]) => void
      invoke: (...args: any[]) => Promise<any>
    }
    api: {
      get: (key: string) => Promise<any>
      set: (key: string, value: string | number) => Promise<any>
      addFinished: (key: string, value: string | number) => Promise<any>
      removeFinished: (key: string, value: string | number) => Promise<any>
      clearFinished: () => Promise<any>

      getModule: (learnKey: string) => Promise<any>
    }
  }
}