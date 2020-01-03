FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80

ENV ASPNETCORE_AUTHORITY https://oauth.apsidetop-devel.net/auth/realms/GDG-Le-Mans
ENV ASPNETCORE_AUDIENCE gdg-le-mans
ENV ASPNETCORE_CONNECTION_STRING Host=gdglemansdb.postgres.database.azure.com;Port=5432;Database=gdglemansdb;Username=gdglemans@gdglemansdb;Password=WiMTMxuvT5ZLg07j;sslmode=Require;


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
