import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { RankingScoreComponent } from './ranking-score/ranking-score.component';
import { RegisterScoreComponent } from './register-score/register-score.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },
  {
    path: 'ranking-score',
    component: RankingScoreComponent,
    data: { title: 'Ranking - Maiores Pontuações' }
  },
  {
    path: 'register-score',
    component: RegisterScoreComponent,
    data: { title: 'Registrar Pontuação' }
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
