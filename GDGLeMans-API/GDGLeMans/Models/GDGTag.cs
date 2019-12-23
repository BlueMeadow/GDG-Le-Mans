using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GDGLeMans.Models
{
    public class GDGTag
    {
        [Key]
       [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("tagString")]
        [Required]
        public string TagString { get; set; }
        [JsonIgnore]
        public List<MeetupTag> MeetupTags { get; set; }

        public override string ToString()
        {
            return "TagString => " + TagString;
        }

        public override bool Equals(object obj)
        {
            return obj is GDGTag tag &&
                   TagString.Equals(tag.TagString);
        }
    }
}
