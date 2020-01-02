FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 8090
EXPOSE 44324

ENV ASPNETCORE_AUTHORITY https://oauth.apsidetop-devel.net/auth/realms/GDG-Le-Mans
ENV ASPNETCORE_AUDIENCE gdg-le-mans
ENV ASPNETCORE_CONNECTION_STRING host=gdglemansdb.postgres.database.azure.com;port=5432;database=gdglemansdb;user=gdglemans@gdglemansdb;password=WiMTMxuvT5ZLg07j;sslmode=require


FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["GDGLeMans/GDGLeMans.csproj", "GDGLeMans/"]
RUN dotnet restore "GDGLeMans/GDGLeMans.csproj"
COPY . .
WORKDIR "/src/GDGLeMans"
RUN dotnet build "GDGLeMans.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GDGLeMans.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GDGLeMans.dll"]
