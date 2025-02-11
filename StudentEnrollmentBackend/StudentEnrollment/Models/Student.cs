using System.ComponentModel.DataAnnotations;

namespace StudentEnrollment.Models
{
    public class Student
    {
        public int StudentId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string Nationality { get; set; }

        // Contact information
        [Required]
        [Phone] // Validate phone number format
        public string MobilePhone { get; set; } // Mobile number (personal)

        [Required]
        [EmailAddress] // Validate email format
        public string Email { get; set; }

        [Required]
        public string Address { get; set; }

        // Enrollment Information
        public DateTime EnrollmentDate { get; set; }=  DateTime.Now;// Enrollment date should also be required

        [Required]
        public string Course { get; set; }

        // New field to track the student's year
        public int Year { get; set; } = 1;  // Default value is 1 when enrolling


        // Academic Information
        public double GPA { get; set; }

        // Parent/Guardian information
        [Required]
        public string FatherName { get; set; }

        [Required]
        public string MotherName { get; set; }

        [Required]
        [Phone] // Validate phone number format
        public string FatherPhone { get; set; }

        [Required]
        [Phone] // Validate phone number format
        public string MotherPhone { get; set; }

        // Profile picture (optional)
        public string ProfilePictureUrl { get; set; }
    }
}
