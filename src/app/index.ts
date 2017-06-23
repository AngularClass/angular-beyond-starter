import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { Details } from './details';
import { MainModule } from './main.module';

import { load as loadWebFont } from 'webfontloader';

const platformRef = platformBrowserDynamic();

// on document ready bootstrap Angular 2
export function main() {
  // Load fonts async
  // https://github.com/typekit/webfontloader#configuration
  loadWebFont({
    google: {
      families: ['Droid Sans']
    }
  });

  return platformRef.bootstrapModule(MainModule);
}

switch (document.readyState) {
 case 'loading':
   document.addEventListener('DOMContentLoaded', _domReadyHandler, false);
   break;
 case 'interactive':
 case 'complete':
 default:
   main();
}

function _domReadyHandler() {
  document.removeEventListener('DOMContentLoaded', _domReadyHandler, false);
  main();
}
