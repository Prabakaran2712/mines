import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { MainBodyComponent } from './main-body/main-body.component';

const routes: Routes = [
  { path: '', component: MainBodyComponent },
  { path: 'game/:mode', component: GameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
