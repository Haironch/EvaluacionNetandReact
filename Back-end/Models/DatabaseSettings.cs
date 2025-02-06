namespace Back_end.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
        public string StudentsCollectionName { get; set; } = string.Empty;
    }
}