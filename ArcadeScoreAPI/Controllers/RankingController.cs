using ArcadeScoreAPI.DAL;
using ArcadeScoreAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ArcadeScoreAPI.Controllers
{
    public class RankingController : ApiController
    {
        private ArcadeScoreContext dbContext = new ArcadeScoreContext();

        // GET: api/Ranking
        public IEnumerable<Player> Get()
        {
            var listPlayer = dbContext.Players.Include("Matches").OrderByDescending(o => o.HighestScore);

            return listPlayer.ToList();
        }

        // GET: api/Ranking/5
        public string Get(int id)
        {
            //Se lista de ranking extensiva, entao buscar estatisticas no modal via requisicao
            return "value";
        }
    }
}
