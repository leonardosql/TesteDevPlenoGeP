using ArcadeScoreAPI.DAL;
using ArcadeScoreAPI.Models;
using System.Linq;
using System.Web.Http;

namespace ArcadeScoreAPI.Controllers
{
    public class RegisterScoreController : ApiController
    {
        private ArcadeScoreContext dbContext = new ArcadeScoreContext();

        public RegisterScoreController()
        {

        }

        // POST: api/RegisterScore
        public void Post([FromBody] Match match)
        {
            if (match != null)
            {
                dbContext.Matches.Add(match);
                dbContext.SaveChanges();


                var player = dbContext.Players.Include("Matches").FirstOrDefault(o => o.PlayerId == match.PlayerId);

                if (match.Score > player.HighestScore)
                {
                    player.RecordTime++;
                    player.LowestScore = player.HighestScore;
                    player.HighestScore = match.Score;

                    int totalScore = 0;
                    foreach (var item in player.Matches)
                        totalScore = totalScore + item.Score;

                    player.AverageScore = (totalScore / player.MatchesCount);

                    dbContext.SaveChanges();
                }
            }
        }
    }
}
