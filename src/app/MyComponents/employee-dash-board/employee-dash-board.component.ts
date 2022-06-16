import { ApiService } from '../services/api.service';
import { EmployeeDetails } from './model-employee-dash-board';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-dash-board',
  templateUrl: './employee-dash-board.component.html',
  styleUrls: ['./employee-dash-board.component.css']
})
export class EmployeeDashBoardComponent implements OnInit {
  tittle = "Employee DataBase";
  formValue !: FormGroup;
  employeeObj: EmployeeDetails = new EmployeeDetails();
  employeeData !: any;
  showAdd !:boolean;
  showUpdate !:boolean;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobileNumber: [''],
      designation: [''],
      salary: [''],
      emailId: ['']
    });
    this.getAllEmployeeInfo();
  }
  clickAddEmployeeBtn(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  addEmployeeDetails() {
    // this.employeeObj.empId =this.formValue.value.empId;
    this.employeeObj.empName = this.formValue.value.firstName + " " + this.formValue.value.lastName;
    this.employeeObj.emailId = this.formValue.value.emailId;
    this.employeeObj.empDesignation = this.formValue.value.designation;
    this.employeeObj.mobileNo = this.formValue.value.mobileNumber;
    this.employeeObj.salary = this.formValue.value.salary;

    this.apiService.postEmployee(this.employeeObj).subscribe(res => {
      console.log(res);
      alert("Employee Data Added Successfully");
      let cancelBtn = document.getElementById('cancel');
      cancelBtn?.click();
      this.formValue.reset();
      
    },
      err => {
        console.log(err);
        alert("Something Wrong");
      });
  }

  getAllEmployeeInfo() {
    this.apiService.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }

  deleteEmployee(row: any) {
    this.apiService.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Confirm to Delete");
        this.getAllEmployeeInfo();
      })
  }

  editEmployeeInfo(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeObj.empId = row.id;
    let empFullName = row.empName.split(' ');
    let firstName = empFullName[0];
    let lastName = empFullName[1];
    this.formValue.controls['firstName'].setValue(firstName);
    this.formValue.controls['lastName'].setValue(lastName);
    this.formValue.controls['mobileNumber'].setValue(row.mobileNo);
    this.formValue.controls['emailId'].setValue(row.emailId);
    this.formValue.controls['designation'].setValue(row.empDesignation);
    this.formValue.controls['salary'].setValue(row.salary);

  }

  updateEmployeeDetails() {
    // this.employeeObj.empId =this.formValue.value.empId;
    this.employeeObj.empName = this.formValue.value.firstName+" "+this.formValue.value.lastName;
    this.employeeObj.emailId = this.formValue.value.emailId;
    this.employeeObj.empDesignation = this.formValue.value.designation;
    this.employeeObj.mobileNo = this.formValue.value.mobileNumber;
    this.employeeObj.salary = this.formValue.value.salary;

    this.apiService.updateEmployee(this.employeeObj, this.employeeObj.empId)
      .subscribe(res => {
        alert("Employee Data Updated Successfully " + this.employeeObj.empId);
        let cancelBtn = document.getElementById('cancel');
        cancelBtn?.click();
        this.formValue.reset();
        this.getAllEmployeeInfo();

      })
  }



}
