using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Back_end.Models
{
    public class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }  // Hacemos el Id nullable con ?

        [BsonElement("nombre")]
        public required string Nombre { get; set; }

        [BsonElement("fechaNacimiento")]
        public DateTime FechaNacimiento { get; set; }

        [BsonElement("nombrePadre")]
        public required string NombrePadre { get; set; }

        [BsonElement("nombreMadre")]
        public required string NombreMadre { get; set; }

        [BsonElement("grado")]
        public required string Grado { get; set; }

        [BsonElement("seccion")]
        public required string Seccion { get; set; }

        [BsonElement("fechaIngreso")]
        public DateTime FechaIngreso { get; set; }
    }
}