using Newtonsoft.Json;

namespace Meetup.Api.Models.Root
{
    public class PhotoSample
    {

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("highres_link")]
        public string HighresLink { get; set; }

        [JsonProperty("photo_link")]
        public string PhotoLink { get; set; }

        [JsonProperty("thumb_link")]
        public string ThumbLink { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("base_url")]
        public string BaseUrl { get; set; }

    }
}