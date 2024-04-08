import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {

  constructor(private apollo: Apollo) {}

  // Login Query
  login(username: string, password: string) {
    return this.apollo.query({
      query: gql`
        query Login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            _id
            username
            email
          }
        }
      `,
      variables: {
        username,
        password,
      },
      fetchPolicy: 'network-only',
    });
  }  

  // Get All Employees Query
  getAllEmployees() {
    return this.apollo.query({
      query: gql`
        query GetAllEmployees {
          getAllEmployees {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      fetchPolicy: 'network-only',
    });
  }

  // Search Employee By ID Query
  searchEmployeeById(_id: string) {
    return this.apollo.query({
      query: gql`
        query SearchEmployeeById($_id: ID!) {
          searchEmployeeById(_id: $_id) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        _id,
      },
      fetchPolicy: 'network-only',
    });
  }  

  // Signup Mutation
  signup(username: string, email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password) {
            _id
            username
            email
          }
        }
      `,
      variables: {
        username,
        email,
        password,
      },
    });
  }  

  // Add New Employee Mutation
  addNewEmployee(first_name: string, last_name: string, email: string, gender: string, salary: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation AddNewEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String!, $salary: Float!) {
          addNewEmployee(first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        first_name,
        last_name,
        email,
        gender,
        salary,
      },
    });
  }
  
  // Update Employee Mutation
  updateEmployeeById(_id: string, first_name: string, last_name: string, email: string, gender: string, salary: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployeeById($_id: ID!, $first_name: String, $last_name: String, $email: String, $gender: String, $salary: Float) {
          updateEmployeeById(_id: $_id, first_name: $first_name, last_name: $last_name, email: $email, gender: $gender, salary: $salary) {
            _id
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        _id,
        first_name,
        last_name,
        email,
        gender,
        salary,
      },
    });
  }

  // Delete Employee Mutation
  deleteEmployeeById(_id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployeeById($_id: ID!) {
          deleteEmployeeById(_id: $_id) {
            _id
          }
        }
      `,
      variables: {
        _id,
      },
    });
  }  
}