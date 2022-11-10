import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: MainBodyComponent },
  { path: 'game/:mode', component: GameComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
