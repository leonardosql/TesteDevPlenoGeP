using ArcadeScoreAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ArcadeScoreAPI.DAL
{
    public class ArcadeScoreInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<ArcadeScoreContext>
    {
        protected override void Seed(ArcadeScoreContext context)
        {
            var players = new List<Player>
            {
                new Player{Name="Carson"},
                new Player{Name="Meredith"},
                new Player{Name="Arturo"},
            };

            players.ForEach(s => context.Players.Add(s));
            context.SaveChanges();


            var matches = new List<Match>
            {
                new Match{PlayerId=1,RegistredAt=DateTime.Parse("2023-03-20"), Score=100, },
                new Match{PlayerId=2,RegistredAt=DateTime.Parse("2023-03-20"), Score=150, },
                new Match{PlayerId=3,RegistredAt=DateTime.Parse("2023-03-20"), Score=200, },

            };

            foreach (var item in matches)
            {
                var player = context.Players.FirstOrDefault(o => o.PlayerId == item.PlayerId);

                player.HighestScore = item.Score;
                player.AverageScore = item.Score;
                player.LowestScore = 0;
                player.RecordTime = 0;
            }

            matches.ForEach(m => context.Matches.Add(m));
            context.SaveChanges();
        }
    }
}