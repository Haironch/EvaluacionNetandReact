using Microsoft.AspNetCore.Mvc;
using Back_end.Models;
using Back_end.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentsController : ControllerBase
    {
        private readonly StudentService _studentService;

        public StudentsController(StudentService studentService)
        {
            _studentService = studentService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> Get()
        {
            var students = await _studentService.GetAllAsync();
            return Ok(students);
        }

        [HttpGet("grado/{grado}")]
        public async Task<ActionResult<List<Student>>> GetByGrade(string grado)
        {
            var students = await _studentService.GetByGradeAsync(grado);
            if (students == null || !students.Any())
                return NotFound($"No se encontraron estudiantes en el grado {grado}");
            return Ok(students);
        }

        [HttpPost]
        public async Task<ActionResult<Student>> Create(Student student)
        {
            await _studentService.CreateAsync(student);
            return CreatedAtAction(nameof(GetByGrade), new { grado = student.Grado }, student);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var student = await _studentService.GetByIdAsync(id);
                if (student == null)
                {
                    return NotFound($"No se encontró el estudiante con ID {id}");
                }

                await _studentService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno al eliminar el estudiante: {ex.Message}");
            }
        }
    }
}