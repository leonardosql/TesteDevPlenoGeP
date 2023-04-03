using ArcadeScoreAPI.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ArcadeScoreAPI.DAL
{
    public class ArcadeScoreContext : DbContext
    {

        public ArcadeScoreContext() : base("ArcadeScoreContext")
        {

        }

        public DbSet<Player> Players { get; set; }
        public DbSet<Match> Matches { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}