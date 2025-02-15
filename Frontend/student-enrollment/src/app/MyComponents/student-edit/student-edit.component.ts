import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Model/student';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class StudentEditComponent implements OnInit {
  student!: Student;
  editStudentForm!: FormGroup;
  isEditable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.editStudentForm = this.fb.group({
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

    const studentId = this.route.snapshot.paramMap.get('id');
    if (studentId && !isNaN(Number(studentId))) {
      this.getStudentDetails(Number(studentId));
    } else {
      console.error('Invalid or missing student ID');
    }
  }

  getStudentDetails(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe(
      (data) => {
        console.log('Fetched student data:', data);
        this.student = data;
        this.populateForm();
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }

  populateForm(): void {
    if (this.student) {
      this.editStudentForm.patchValue({
        FirstName: this.student.firstName || '',
        LastName: this.student.lastName || '',
        DateOfBirth: this.student.dateOfBirth ? new Date(this.student.dateOfBirth) : '',
        Gender: this.student.gender || '',
        Nationality: this.student.nationality || '',
        MobilePhone: this.student.mobilePhone || '',
        Email: this.student.email || '',
        Address: this.student.address || '',
        EnrollmentDate: this.student.enrollmentDate ? new Date(this.student.enrollmentDate) : '',
        Course: this.student.course || '',
        Year: this.student.year || 1,
        FatherName: this.student.fatherName || '',
        MotherName: this.student.motherName || '',
        FatherPhone: this.student.fatherPhone || '',
        MotherPhone: this.student.motherPhone || '',
        ProfilePictureUrl: this.student.profilePictureUrl || ''
      });
    }
  }

  onSubmit(): void {
    if (this.editStudentForm.valid) {
      const updatedStudent = { ...this.student, ...this.editStudentForm.value };

      this.studentService.updateStudent(updatedStudent).subscribe(
        (response) => {
          console.log('Student updated successfully', response);
          this.router.navigate(['/students']); // Navigate after successful update
        },
        (error) => {
          console.error('Error updating student details:', error);
        }
      );
    } else {
      console.log("Form is invalid:", this.editStudentForm.errors);
    }
  }

  toggleEditMode(value: boolean) {
    this.isEditable = value;
    if (this.isEditable) {
      this.editStudentForm.enable();
    } else {
      this.editStudentForm.disable();
    }
  }


}
