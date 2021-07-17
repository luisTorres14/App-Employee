import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }


  addEmployee(employee: any): Promise<any> {
    return this.firestore.collection('employees').add(employee);
  }

  getEmployee(): Observable<any> {
    return this.firestore.collection('employees', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  deleteEmployeee(id: string): Promise<any> {
    return this.firestore.collection('employees').doc(id).delete();
  }

  getEmp(id: string): Observable<any> {
    return this.firestore.collection('emplyees').doc(id).snapshotChanges();
  }
}
