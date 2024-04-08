import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'employees', 
    component: EmployeesListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/create', 
    component: EmployeeCreateComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id', 
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/edit/:id', 
    component: EmployeeEditComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
