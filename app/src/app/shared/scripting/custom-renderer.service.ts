import { Renderer2 } from "@angular/core";
import { Injectable } from '@angular/core';

@Injectable()
export class Renderer2Custom  {
    constructor(private renderer : Renderer2) { }

    on(target: 'window' | 'document' | 'body' | any, eventNames : string[], callback: (event: any) => boolean | void) : (() => void)[]
    {
        let unlisteners = eventNames.map(x => this.renderer.listen(target, x, callback));

        return unlisteners;
    }
}