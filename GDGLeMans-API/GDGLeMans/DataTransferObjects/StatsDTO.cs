using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDGLeMans.DataTransferObjects
{
    public class StatsDTO
    {
        [JsonProperty("membersCount")]
        public int MembersCount;
        [JsonProperty("averageParticipant")]
        public int AverageParticipant;
        [JsonProperty("eventCount")]
        public int EventCount;

    }
}
