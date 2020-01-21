using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace Meetup.Api.Models.Root
{
    public class PhotoAlbum
    {

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("photo_count")]
        public int PhotoCount { get; set; }

        [JsonProperty("photo_sample")]
        public PhotoSample[] PhotoSample { get; set; }

    }
}
