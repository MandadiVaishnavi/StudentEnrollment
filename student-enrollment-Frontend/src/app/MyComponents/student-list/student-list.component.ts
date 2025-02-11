import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Student } from '../../Model/student';
import { MatCardModule } from '@angular/material/card';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';  // Adjust path if needed

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, RouterModule, MatCardModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'course', 'year', 'actions'];
  students: Student[] = [];

  constructor(private dialog: MatDialog, private router:Router,private studentService: StudentService) { }

  ngOnInit() {
    this.getStudents();
  }

  getStudents(): void {
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

  viewDetails(studentId: number): void {
    console.log("In studentlist:", studentId);  // Check if the studentId is valid
    if (studentId) {
      this.router.navigate([`/student/${studentId}/view`]); // Navigate to student detail page
    } else {
      console.error('Invalid student ID:', studentId);
    }
  }


  editStudent(studentId: number) {
    this.router.navigate([`/student/${studentId}/edit`]);
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
