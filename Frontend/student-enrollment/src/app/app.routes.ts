import { Routes } from '@angular/router';
import { HomeComponent } from './MyComponents/home/home.component';
import { StudentEnrollmentComponent } from './MyComponents/student-enrollment/student-enrollment.component';
import { StudentListComponent } from './MyComponents/student-list/student-list.component';
import { StudentDetailsComponent } from './MyComponents/student-details/student-details.component';
import { StudentEditComponent } from './MyComponents/student-edit/student-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'enroll', component: StudentEnrollmentComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'student/:id/view', component: StudentDetailsComponent },
  { path: 'student/:id/edit', component: StudentEditComponent },
];
