using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) //Constructor with options
        {
        }

        public DbSet<Activity> Activities { get; set; } //Represents table name
    }
}