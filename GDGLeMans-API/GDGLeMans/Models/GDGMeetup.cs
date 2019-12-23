using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GDGLeMans.Models
{
    /**
     * This class represents the meetup event as it is stored in the database
     * We're only storing the additionnal content for the website and the event ID (here it's the MeetupId field)
     * What is sent to the Angular application is the [Name pending] Which has all the data of the event
     * date, duration, title, speaker, and so on.
     */

    public class GDGMeetup
    {
        [Key]
        [JsonProperty("id")]
        public long Id { get; set; }
        [Required]
        [JsonProperty("speakerName")]
        public string SpeakerName { get; set; }
        [JsonProperty("content")]
        public string Content { get; set; }
        //ID from the meetup API
        //Is a string since the dotnet Meetup Api uses them as strings
        [JsonProperty("meetupId")]
        public string MeetupId { get; set; }
        [JsonProperty("upcoming")]
        public Boolean Upcoming { get; set; }

        [JsonIgnore]
        public List<MeetupTag> MeetupTags { get; set;  }

        public override bool Equals(object obj)
        {
            return obj is GDGMeetup meetup &&
                   Id == meetup.Id;
        }

        public override string ToString()
        {
            string s = "";
            s += "ID = " + Id;
            s += "\nspeakerName = " + SpeakerName;
            s += "\nMeetupTags = ";
            if (MeetupTags != null)
            {
                
                foreach(MeetupTag mt in MeetupTags)
                {
                    s += mt.ToString();
                }
            } else
            {
                s += "null";
            }
            return s;
        }
    }
}
