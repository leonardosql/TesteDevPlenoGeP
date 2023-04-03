using System;
using System.Collections.Generic;
using System.Linq;

namespace ArcadeScoreAPI.Models
{
    public class Player
    {
        public Player()
        {

        }

        public int PlayerId { get; set; }
        public String Name { get; set; }

        public ICollection<Match> Matches { get; set; }

        public int MatchesCount { get => Matches != null ? Matches.Count : 0; }
        public int AverageScore { get; set; }
        public int HighestScore { get; set; }
        public int LowestScore { get; set; }
        public int RecordTime { get; set; }
        public int GameTime
        {
            get => GetGameTimeCalculate();
        }

        private int GetGameTimeCalculate()
        {
            if (Matches != null && Matches.Count > 1)
            {
                var firstMatchDate = Matches.First().RegistredAt;
                var lastMatchDate = Matches.Last().RegistredAt;
                var mouthsPerDate = lastMatchDate.Month - firstMatchDate.Month;

                return mouthsPerDate;
            }
            else
            {
                return 0;
            }
        }
    }
}