import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createEmployee: FormGroup;
  submitted = false;
  loadding = false;
  id: string | null;
  title = "Agregar Empleado";

  constructor(private fb: FormBuilder, private _employeeService: EmployeeService, private router: Router, private toastr: ToastrService, private aRoute: ActivatedRoute) {
    this.createEmployee = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required]
    });
    this.id = aRoute.snapshot.paramMap.get('id');
    console.log(this.id);

  }

  ngOnInit(): void {
    this.isEdit();
  }

  addEmployee() {
    this.submitted = true;
    if (this.createEmployee.invalid) {
      return;
    }

    const employee: any = {
      nombre: this.createEmployee.value.nombre,
      apellido: this.createEmployee.value.apellido,
      documento: this.createEmployee.value.documento,
      salario: this.createEmployee.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this.loadding = true;
    console.log(employee);

    this._employeeService.addEmployee(employee).then(() => {
      this.toastr.success('Empleado registrado con exito!', 'Empleado Registrado', {
        positionClass: 'toast-bottom-right'
      });
      this.loadding = false;
      this.router.navigate(['/listEmployee']);
    }).catch(error => {
      console.log(error);
      this.loadding = false;
    });
  }

  isEdit() {
    if (this.id != null) {
      this.title = 'Editar Empleado';
      this._employeeService.getEmp(this.id).subscribe(data => {
        console.log(data);

        console.log(data.payload.data()['nombre']);
        // this.createEmployee.setValue({
        //   nombre: data.payload.data()['nombre'],
        //   apellido: data.payload.data()['apellido'],
        //   documento: data.payload.data()['documento'],
        //   salario: data.payload.data()['salario'],
        // });
      });
    }
  }
}
