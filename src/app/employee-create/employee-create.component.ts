import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../services/graph-ql.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {
  newEmployee = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: null
  };

  constructor(
    private graphQLService: GraphQLService,
    private router: Router
  ) {}

  addEmployee(): void {
    if (this.newEmployee.first_name && this.newEmployee.last_name && this.newEmployee.email && this.newEmployee.gender && this.newEmployee.salary) {
      this.graphQLService.addNewEmployee(
        this.newEmployee.first_name, 
        this.newEmployee.last_name, 
        this.newEmployee.email, 
        this.newEmployee.gender, 
        this.newEmployee.salary
      ).subscribe({
        next: (result) => {
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          console.error('Error adding employee:', error);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}