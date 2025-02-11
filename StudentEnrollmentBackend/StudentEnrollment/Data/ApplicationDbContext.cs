using Microsoft.EntityFrameworkCore;
using StudentEnrollment.Models;

namespace StudentEnrollment.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) {
            
        }
        public DbSet<Student> Students { get; set; }
       

    }
}
