import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GraphQLService } from '../services/graph-ql.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = null;
  loading = false;
  error: string | null = null;

  constructor(
    private location: Location,
    private graphQLService: GraphQLService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployeeDetails();
  }

  goBack(): void {
    this.location.back();
  }

  loadEmployeeDetails(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.graphQLService.searchEmployeeById(id).subscribe({
        next: (result: any) => {
          this.employee = result.data.searchEmployeeById;
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
}