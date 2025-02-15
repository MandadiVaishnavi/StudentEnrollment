import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Import Angular Material modules
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatSelectModule
  ],  // Import Angular Material modules
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  student = {
    firstName: '',
    lastName: '',
    email: '',
    mobilePhone: '',
    address: '',
    course: '',
    enrollmentDate: '',
    year: 1
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.student.enrollmentDate = new Date();  // Set the enrollment date to now
    this.http.post('http://localhost:5000/api/student', this.student).subscribe(
      (response) => {
        console.log('Student enrolled successfully', response);
        // Clear form fields or redirect as needed
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
