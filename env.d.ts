/// <reference types="vite/client" />

declare module '*.vue' {

  import type { DefineComponent } from 'vue';

  const vueComponent: DefineComponent<{}, {}, any>;

  export default vueComponent;

}

declare interface Window {
  clipboardData: any;
}

declare interface Element {
  checkValidity: () => boolean;
}

// declare interface HTMLSelectElement {
//   options: (HTMLOptionElement | null)[]
// }