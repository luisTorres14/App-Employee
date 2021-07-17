import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmployeeService } from './../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: any[] = [];

  constructor(private _serviceEmployee: EmployeeService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this._serviceEmployee.getEmployee().subscribe(data => {
      this.employees = [];
      data.forEach((element: any) => {
        this.employees.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      console.log(this.employees);

    });
  }

  deleteEmployee(id: string) {
    this._serviceEmployee.deleteEmployeee(id).then(() => {
      this.toastr.error('Registro eliminado con exito!', 'Registro eliminado!', {
        positionClass: 'toast-bottom-right'
      });

    }).catch(error => {
      console.log(error);

    });
  }
}
