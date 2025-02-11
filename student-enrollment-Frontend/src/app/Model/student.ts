// src/app/models/student.ts

export class Student {
  studentId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string|null; // This can be a string that represents the date in ISO format
  gender: string;
  nationality: string;
  mobilePhone: string;
  email: string;
  address: string;
  enrollmentDate: string|null; // This can be a string that represents the date in ISO format
  course: string;
  year: number;
  gpa: number;
  fatherName: string;
  motherName: string;
  fatherPhone: string;
  motherPhone: string;
  profilePictureUrl?: string; // Optional field

  constructor(
    studentId: number,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    gender: string,
    nationality: string,
    mobilePhone: string,
    email: string,
    address: string,
    enrollmentDate: string,
    course: string,
    year: number,
    gpa: number,
    fatherName: string,
    motherName: string,
    fatherPhone: string,
    motherPhone: string,
    profilePictureUrl?: string // Optional field
  ) {
    this.studentId = studentId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.nationality = nationality;
    this.mobilePhone = mobilePhone;
    this.email = email;
    this.address = address;
    this.enrollmentDate = enrollmentDate;
    this.course = course;
    this.year = year;
    this.gpa = gpa;
    this.fatherName = fatherName;
    this.motherName = motherName;
    this.fatherPhone = fatherPhone;
    this.motherPhone = motherPhone;
    this.profilePictureUrl = profilePictureUrl;
  }
}
