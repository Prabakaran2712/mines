import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { OptionCardComponent } from './option-card/option-card.component';
import { GameComponent } from './game/game.component';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainBodyComponent,
    OptionCardComponent,
    GameComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
