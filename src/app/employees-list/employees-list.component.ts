import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphQLService } from '../services/graph-ql.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {
  employees: any[] = [];
  loading = false;
  error: string | null = null;

  constructor(private graphQLService: GraphQLService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.graphQLService.getAllEmployees().subscribe({
      next: (result: any) => {
        this.employees = result.data.getAllEmployees;
        this.loading = false;
      },
      error: (error: any) => {
        this.error = 'An error occurred while loading employees.';
        this.loading = false;
        console.error('Error loading employees:', error);
      }
    });
  }

  addEmployee(): void {
    this.router.navigate(['/employees/create']);
  }

  updateEmployee(id: string): void {
    this.router.navigate(['/employees/edit', id]);
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employees', id]);
  }

  deleteEmployee(id: string): void {
    if (confirm("Are you sure you want to delete this employee?")) {
      this.loading = true;
      this.graphQLService.deleteEmployeeById(id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (error) => {
          this.error = 'An error occurred while deleting the employee.';
          this.loading = false;
          console.error('Error deleting employee:', error);
        }
      });
    }
  }
}