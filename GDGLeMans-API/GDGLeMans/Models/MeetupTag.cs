using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GDGLeMans.Models
{
    // Many-To-Many join class
    public class MeetupTag
    {
        [Key]
        public long GDGMeetupId { get; set; }

        [Key]
        public long GDGTagId { get; set; }
        public GDGMeetup GDGMeetup { get; set; }        
        public GDGTag GDGTag { get; set; }

        public override bool Equals(object obj)
        {
            return obj is MeetupTag tag &&
                   GDGMeetup.Equals(tag.GDGMeetup) && GDGTag.Equals(tag.GDGTag);
        }

        public override string ToString()
        {
            return "GDGMeetupId = " + GDGMeetupId + "\n" +
                   "GDGMeetup = " + (GDGMeetup == null ? "null" : "notnull") + "\n" +
                   "GDGTagId = " + GDGTagId + "\n" +
                   "GDGTag = " + (GDGTag == null ? "null" : "notnull") + "\n";
         }

    }
}
