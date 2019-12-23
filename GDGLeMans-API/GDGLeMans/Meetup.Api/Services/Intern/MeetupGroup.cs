using Meetup.Api.Annotations;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Meetup.Api.Services.Intern
{
    public class MeetupGroup
    {

        /// <summary>
        /// Fetches a Meetup group by its urlname
        /// </summary>
        /// <param name="urlName">The urlname path element may be any valid group urlname.</param>
        /// <param name="cancellationToken">Cancellation Token</param>
        /// <returns>Task&lt;Event&gt;.</returns>
        /// <exception cref="HttpRequestException">
        ///     Ops! Something went wrong :S. Please try again, if the error persist contact
        ///     with the developer to fix the issue.
        /// </exception>
        public async Task<Group> Group([NotNull]string urlName, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(urlName)) throw new ArgumentException("Argument is null or empty", nameof(urlName));         
            if (string.IsNullOrWhiteSpace(urlName)) throw new ArgumentException("Argument is null or whitespace", nameof(urlName));

            var queryUrl = new StringBuilder(MeetupBase.BASE_URL);
            queryUrl.Append($"/{urlName}");

            var response =
                await MeetupBase.ExecuteQueryAsync<Group>(queryUrl, cancellationToken);

            if (response == null)
                throw new HttpRequestException(Resources.ErrorMessage);
            return response;
        }


    }
}
