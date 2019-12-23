using GDGLeMans.Models;
using Meetup.Api;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GDGLeMans.DataTransferObjects
{
    public class MeetupDTO
    {
        [JsonProperty("gdgMeetup")]
        public GDGMeetup GDGMeetup { get; set; }
        [JsonProperty("event")]
        public Event Event { get; set; }
        [JsonProperty("tags")]
        public List<GDGTag> Tags { get; set; }

        public override string ToString()
        {
            var s = GDGMeetup.ToString();
            foreach(GDGTag t in Tags)
            {
                s += t.ToString() + "\n";
            }
            return s;
        }

    }
}
