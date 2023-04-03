using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ArcadeScoreAPI.Models
{
    public class Match
    {
        public int Id { get; set; }

        public int PlayerId { get; set; }
        public int Score { get; set; }
        public DateTime RegistredAt { get; set; }
    }
}