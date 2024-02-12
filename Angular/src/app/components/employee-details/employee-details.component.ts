import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/employee';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.css'
})
export class EmployeeDetailsComponent implements OnInit {

  id!: number;
  employee!: Employee;

  constructor(private route: ActivatedRoute,private router: Router,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employee = new Employee();

    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployee(this.id)
      .subscribe(
        {
          next: (data: Employee) => {
            console.log(data);
            this.employee = data;
          },
          error: (e) => console.error(e),
          complete: () => console.info('complete')
      })
  }

  list(){
    this.router.navigate(['employees']);
  }
}
