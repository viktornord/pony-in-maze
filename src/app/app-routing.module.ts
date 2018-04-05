import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MazeSetupComponent} from "./maze-setup/maze-setup.component";
import {MazeComponent} from './maze/maze.component';

const routes: Routes = [
  { path: 'maze-setup', component: MazeSetupComponent },
  { path: 'maze', component: MazeComponent },
  { path: '**', redirectTo: 'maze-setup' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
