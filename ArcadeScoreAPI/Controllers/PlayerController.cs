using ArcadeScoreAPI.DAL;
using ArcadeScoreAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ArcadeScoreAPI.Controllers
{
    public class PlayerController : ApiController
    {
        private ArcadeScoreContext dbContext = new ArcadeScoreContext();


        // GET: Player
        public ICollection<Player> Get()
        {
            var listPlayer = dbContext.Players.OrderBy(o => o.PlayerId);

            return listPlayer.ToList();
        }

        // GET api/Player/5
        public Player Get(int id)
        {
            var player = dbContext.Players.Where(o => o.PlayerId == id);

            return player.FirstOrDefault();
        }
    }
}