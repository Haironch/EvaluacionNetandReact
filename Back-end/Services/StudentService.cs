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
    }
}