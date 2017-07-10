import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { WindowRef } from "app/shared/scripting/window-ref.service";
import { Renderer2Custom } from "app/shared/scripting/custom-renderer.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [
    Renderer2Custom,
    WindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
