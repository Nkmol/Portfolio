'use strict';

import { Injectable } from '@angular/core';

function _window(): any {
  // return the global native browser window object
  return window;
}

@Injectable()
export class WindowRef {
  matchMedia(query : string) : MediaQueryList {
      return _window().matchMedia(query);
  }
}
