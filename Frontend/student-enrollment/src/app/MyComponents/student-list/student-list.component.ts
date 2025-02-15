import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Model/student';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  editingFieldId: string | null = null; // Stores the ID of the field being edited

  constructor(private studentService: StudentService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadStudents();
  }

  // Fetch all students
  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data) => {
        console.log('Data received from the backend:', data);
        console.log("API Response:", data); // Check property names
        this.students = data.map(student => ({
          ...student,
          dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : null,
          enrollmentDate: student.enrollmentDate ? new Date(student.enrollmentDate).toLocaleDateString() : null,
        }));
      },
      (error) => {
        console.error('Error fetching students:', error);
        if (error.status === 0) {
          console.error('Possible CORS issue or backend is not running.');
        }
      }
    );
  }

  // Navigate to View Student Page
  viewStudent(studentId: number) {
    console.log("In studentlist:", studentId); // Check if the studentId is valid
    if (studentId) {
      this.router.navigate([`/student/${studentId}/view`]); // Navigate to student detail page
    } else {
      console.error('Invalid student ID:', studentId);
    }
  }

  // Navigate to Edit Student Page
  editStudent(studentId: number) {
    this.router.navigate([`/student/${studentId}/edit`]);
  }

  // Start Inline Editing on Double Click
  startEditing(studentId: number, field: string) {
    this.editingFieldId = `${studentId}-${field}`;
  }

  // Save Edited Field Value and Exit Editing Mode
  saveField(student: any, field: string) {
    if (!student.studentId) {
      console.error('Missing studentId:', student);
      alert('Error: studentId is missing.');
      return;
    }

    const updatedStudent: Student = {
      studentId: student.studentId,
      firstName: student.firstName || '',
      lastName: student.lastName || '',
      course: student.course || '',
      year: student.year || 1,
      dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString() : null,
      enrollmentDate: student.enrollmentDate ? new Date(student.enrollmentDate).toISOString() : null,
      gender: student.gender || '',
      nationality: student.nationality || '',
      mobilePhone: student.mobilePhone || '',
      email: student.email || '',
      address: student.address || '',
      gpa: student.gpa || 0,
      fatherName: student.fatherName || '',
      motherName: student.motherName || '',
      fatherPhone: student.fatherPhone || '',
      motherPhone: student.motherPhone || '',
      profilePictureUrl: student.profilePictureUrl || ''
    };

    console.log('Sending PUT request:', JSON.stringify(updatedStudent, null, 2));

    this.studentService.updateStudent(updatedStudent).subscribe({
      next: () => {
        console.log('Student updated successfully');
        this.editingFieldId = null;
      },
      error: (error) => {
        console.error('Error updating student:', error);
        alert(`Error updating student: ${error.error?.message || 'Invalid request'}`);
      }
    });
  }





  deleteStudent(studentId: number) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    // After the dialog is closed, handle the result (either true or false)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If the user clicked 'Yes', proceed with deleting the student
        console.log(`Confirmed: Deleting student with ID: ${studentId}`);

        this.studentService.deleteStudent(studentId).subscribe(
          () => {
            console.log(`Student with ID ${studentId} deleted successfully.`);
            this.students = this.students.filter(student => student.studentId !== studentId);
          },
          (error) => {
            console.error('Error deleting student:', error);
          }
        );
      } else {
        // If the user clicked 'No', do nothing
        console.log('Deletion cancelled');
      }
    });
  }
}
