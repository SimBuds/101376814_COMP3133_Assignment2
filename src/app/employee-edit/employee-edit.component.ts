import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphQLService } from '../services/graph-ql.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: any = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: null
  };
  loading = false;
  error: string | null = null;

  constructor(
    private graphQLService: GraphQLService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.graphQLService.searchEmployeeById(id).subscribe({
        next: (result: any) => {
          this.employee = { ...result.data.searchEmployeeById };
          this.loading = false;
        },
        error: (error: any) => {
          this.error = 'An error occurred while loading employee details.';
          this.loading = false;
          console.error('Error loading employee details:', error);
        }
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  updateEmployee(): void {
    this.loading = true;
    this.graphQLService.updateEmployeeById(
      this.employee._id,
      this.employee.first_name,
      this.employee.last_name,
      this.employee.email,
      this.employee.gender,
      this.employee.salary
    ).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (error) => {
        this.error = 'An error occurred while updating the employee.';
        this.loading = false;
        console.error('Error updating employee:', error);
      }
    });
  }
}
