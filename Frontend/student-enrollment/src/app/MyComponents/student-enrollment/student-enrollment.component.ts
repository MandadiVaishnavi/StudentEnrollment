import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { StudentService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-enrollment',
  standalone: true,
  templateUrl: './student-enrollment.component.html',
  styleUrls: ['./student-enrollment.component.css'],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
  ]
})
export class StudentEnrollmentComponent {
  studentForm: FormGroup;

  constructor(private fb: FormBuilder, private studentService: StudentService, private snackBar: MatSnackBar) {
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
      const formData = this.studentForm.value;
      this.studentService.addStudent(formData).subscribe({
        next: (response) => {
          console.log('Student added successfully:', response);
          this.snackBar.open('Student added successfully!', 'Close');
          this.resetForm();  // Reset the form after success
        },
        error: (error) => {
          console.error('Error adding student:', error);
        }
      });
    } else {
      console.log('Form is invalid');
      this.snackBar.open('Failed to add student. Try again!', 'Close');
      this.resetForm();  // Reset the form after failure
    }
  }

  resetForm() {
    this.studentForm.reset({
      FirstName: '',
      LastName: '',
      DateOfBirth: '',
      Gender: '',
      Nationality: '',
      MobilePhone: '',
      Email: '',
      Address: '',
      EnrollmentDate: new Date(),
      Course: '',
      Year: 1,
      FatherName: '',
      MotherName: '',
      FatherPhone: '',
      MotherPhone: '',
      ProfilePictureUrl: ''
    });

    Object.keys(this.studentForm.controls).forEach(key => {
      const control = this.studentForm.get(key);
      if (control) {
        control.markAsPristine();
        control.markAsUntouched();
        control.setErrors(null); // Clear validation errors
      }
    });
  }

}
