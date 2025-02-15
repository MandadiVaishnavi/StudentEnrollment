using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentEnrollment.Data;
using StudentEnrollment.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentEnrollment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public StudentController(ApplicationDbContext context)
        {
            this.context = context;
        }

        // GET: api/student
        [HttpGet]
        public async Task<List<Student>> GetStudents()
        {
            return await context.Students.ToListAsync();
        }

        // GET: api/student/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // POST: api/student
        [HttpPost]
        public async Task<ActionResult<Student>> CreateStudent([FromBody] Student student)
        {
            if (student == null)
            {
                return BadRequest("Student data is null.");
            }

            context.Students.Add(student);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetStudent), new { id = student.StudentId }, student);
        }

        // PUT: api/student/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, [FromBody] Student student)
        {
            if (id != student.StudentId)
            {
                return BadRequest();
            }

            context.Entry(student).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/student/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            context.Students.Remove(student);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return context.Students.Any(e => e.StudentId == id);
        }
    }
}
