import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { ListEmployeeComponent } from './components/list-employee/list-employee.component';

const routes: Routes = [
  { path: '', redirectTo: 'listEmployee', pathMatch: 'full' },
  { path: 'listEmployee', component: ListEmployeeComponent },
  { path: 'createEmployee', component: CreateEmployeeComponent },
  { path: 'editEmployee/:id', component: CreateEmployeeComponent },
  { path: '**', redirectTo: 'listEmployee', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
