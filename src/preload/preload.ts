// Remember to update ambient.d.ts for extending window object
import { IpcEvents } from '../ipc-events';
import { ipcRendererManager } from './ipc';
import { contextBridge } from 'electron';
import { setupFiddleGlobal } from './setup-fiddle';

// Exposes the objects defined over contextBridge API that can be accessed
// by `window.IPC`
contextBridge.exposeInMainWorld('IPC', {
  invoke: (channel: IpcEvents, ...args: Array<any>) =>
    ipcRendererManager.invoke(channel, ...args),

  off: (channel: IpcEvents, listener: (...args: Array<any>) => void) =>
    ipcRendererManager.off(channel, listener),

  on: (
    channel: IpcEvents,
    listener: (event: any, ...args: Array<any>) => void,
  ) => ipcRendererManager.on(channel, listener),

  removeAllListeners: (channel: IpcEvents) =>
    ipcRendererManager.removeAllListeners(channel),

  removeListener: (
    channel: IpcEvents,
    listener: (...args: Array<any>) => void,
  ) => ipcRendererManager.removeListener(channel, listener),

  send: (channel: IpcEvents, ...args: Array<any>) =>
    ipcRendererManager.send(channel, ...args),
});

// Exposes the objects that can be accessed by `window.ElectronFiddle`
async function preload() {
  await setupFiddleGlobal();
}

preload();
