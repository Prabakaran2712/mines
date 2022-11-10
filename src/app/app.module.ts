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
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatchesComponent } from './matches/matches.component';
import { FilterPipe } from './filter.pipe';
import { LoadingComponent } from './loading/loading.component';
import { GameCardComponent } from './game-card/game-card.component';
import { NgPipesModule } from 'ngx-pipes';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainBodyComponent,
    OptionCardComponent,
    GameComponent,
    CellComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    LeaderboardComponent,
    MatchesComponent,
    FilterPipe,
    LoadingComponent,
    GameCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgPipesModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
