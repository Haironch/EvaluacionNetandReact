using MongoDB.Driver;
using Back_end.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Back_end.Services
{
    public class StudentService
    {
        private readonly IMongoCollection<Student> _students;

        public StudentService(DatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _students = database.GetCollection<Student>(settings.StudentsCollectionName);
        }

        public async Task<List<Student>> GetByGradeAsync(string grado)
        {
            return await _students.Find(student => student.Grado == grado).ToListAsync();
        }

        public async Task<Student> CreateAsync(Student student)
        {
            await _students.InsertOneAsync(student);
            return student;
        }

        public async Task<List<Student>> GetAllAsync()
        {
            return await _students.Find(_ => true).ToListAsync();
        }

        // Nuevo método para obtener un estudiante por ID
        public async Task<Student> GetByIdAsync(string id)
        {
            return await _students.Find(student => student.Id == id).FirstOrDefaultAsync();
        }

        // Nuevo método para eliminar un estudiante
        public async Task DeleteAsync(string id)
        {
            await _students.DeleteOneAsync(student => student.Id == id);
        }
    }
}