import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../Model/student';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner'
@Component({
  selector: 'app-student-detail',
  standalone: true, // Make sure you declare it as standalone
  imports: [CommonModule,
    MatCardModule,
    MatGridListModule,
    MatSpinner
            ],
  templateUrl: './student-details.component.html',
  providers: [DatePipe],
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  student: Student | undefined;

  constructor(
    private route: ActivatedRoute,  // To get the student ID from the route
    private studentService: StudentService,  // To fetch student data
    private datePipe: DatePipe 
  ) { }

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id'); // Get student ID from route parameter
    if (studentId && !isNaN(Number(studentId))) {  // Ensure the ID is a valid number
      console.log("This is StudentID: ", studentId);
      this.getStudentDetails(Number(studentId));  // Fetch student details
    } else {
      console.error('Invalid or missing student ID');
    }
  }

  getStudentDetails(studentId: number): void {
    this.studentService.getStudentById(studentId).subscribe(
      (data) => {
        this.student = data;  // Assign fetched student data
        console.log('Data:', JSON.stringify(this.student, null, 2));
      },
      (error) => {
        console.error('Error fetching student details:', error);
      }
    );
  }
}
