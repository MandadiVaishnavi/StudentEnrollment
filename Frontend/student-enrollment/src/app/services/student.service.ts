import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../Model/student';

@Injectable({
  providedIn: 'root' // This ensures the service is available globally
})
export class StudentService {
  
  //private apiUrl = 'https://localhost:7189/api/student'; // Update this based on your backend URL
  private apiUrl = 'http://localhost:5000/api/student';
  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  getStudentById(studentId: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/${studentId}`);
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student);
  }

  // Update student details
  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${student.studentId}`, student);
  }
  deleteStudent(studentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${studentId}`);
  }
}
