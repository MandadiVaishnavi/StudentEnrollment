import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
//import { MatErrorModule } from '@angular/material/core';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-student-enrollment',
  standalone: true, // Standalone component
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.css'],
  imports: [  // Include necessary Angular Material and ReactiveForm modules
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    //MatErrorModule,
    MatNativeDateModule,
    HttpClientModule
  ]
})
export class StudentEnrollmentComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form group
    this.studentForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Gender: ['', Validators.required],
      Nationality: ['', Validators.required],
      MobilePhone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4}[\s-])?(\(?\d{3}\)?[\s-])?[\d\s-]{7,12}$/)]],
      Email: ['', [Validators.required, Validators.email]],
      Address: ['', Validators.required],
      EnrollmentDate: [new Date(), Validators.required],
      Course: ['', Validators.required],
      Year: [1, Validators.required],
      FatherName: ['', Validators.required],
      MotherName: ['', Validators.required],
      FatherPhone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4}[\s-])?(\(?\d{3}\)?[\s-])?[\d\s-]{7,12}$/)]],
      MotherPhone: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4}[\s-])?(\(?\d{3}\)?[\s-])?[\d\s-]{7,12}$/)]],
      ProfilePictureUrl: ['']
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      // Prepare the form data to send to the API
      const formData = this.studentForm.value;

      // Send the POST request to the backend API
      this.http.post('https://localhost:7189/api/student', formData)
        .subscribe({
          next: (response) => {
            console.log('Student added successfully:', response);
          },
          error: (error) => {
            console.error('Error adding student:', error);
          }
        });
    } else {
      console.log('Form is invalid');
    }
  }
}
