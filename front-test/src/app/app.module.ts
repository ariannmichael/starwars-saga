import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListModule } from './modules/character-list/character-list.module';
import { CharacterDetailModule } from './modules/character-detail/character-detail.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CharacterListModule,
    CharacterDetailModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
