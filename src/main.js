import "nes.css/css/nes.min.css";

import './app.scss';
import App from './App.svelte';

const app = new App({
  target: document.getElementById('app')
});

// banner
// generated from http://patorjk.com/software/taag/#p=display&f=Isometric2&t=CO
console.log(`
      ___           ___     
     /\\__\\         /\\  \\    
    /:/  /        /::\\  \\   
   /:/  /        /:/\\:\\  \\  
  /:/  /  ___   /:/  \\:\\  \\ 
 /:/__/  /\\__\\ /:/__/ \\:\\__\\
 \\:\\  \\ /:/  / \\:\\  \\ /:/  /
  \\:\\  /:/  /   \\:\\  /:/  / 
   \\:\\/:/  /     \\:\\/:/  /  
    \\::/  /       \\::/  /   
     \\/__/         \\/__/    
`);

export default app;
