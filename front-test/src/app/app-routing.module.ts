import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './modules/page-list/character-list/character-list.component';
import { CharacterDetailComponent } from './modules/page-detail/character-detail/character-detail.component';


const routes: Routes = [
  {path: 'list', component: CharacterListComponent},
  {path: 'detail/:id', component: CharacterDetailComponent},
  {path: '', redirectTo: 'list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
