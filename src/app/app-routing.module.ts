import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { NyTimesComponent } from './main/ny-times/ny-times.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'ny-times',
    component:NyTimesComponent
  }
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
