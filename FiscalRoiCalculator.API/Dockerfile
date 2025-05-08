FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["FiscalRoiCalculator.API/FiscalRoiCalculator.API.csproj", "FiscalRoiCalculator.API/"]
RUN dotnet restore "FiscalRoiCalculator.API/FiscalRoiCalculator.API.csproj"
COPY . .
WORKDIR "/src/FiscalRoiCalculator.API"
RUN dotnet build "FiscalRoiCalculator.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FiscalRoiCalculator.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FiscalRoiCalculator.API.dll"] 