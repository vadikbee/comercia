declare global {
  interface Number {
    toMoney: () => string;
  }
}

Number.prototype.toMoney = function (): string {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

import { createRoot } from 'react-dom/client'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render( <App /> )