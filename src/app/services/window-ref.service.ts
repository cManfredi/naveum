import { Injectable } from '@angular/core';

// Questa funzione ritorna l'oggetto window del browser
function _window(): any {
  return window;
}

@Injectable()
export class WindowRefService {
  get window(): any {
    return _window();
  }
}
