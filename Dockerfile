# Stage 1: Build the React front-end
FROM node:18 AS react-build
WORKDIR /app/react
COPY . .
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm install && npm run build

# Stage 2: Build the .NET back-end
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dotnet-build
WORKDIR /app/dotnet
COPY dotnet-api/ .
RUN dotnet restore && dotnet publish -c Release -o out

# Stage 3: Final image to run the application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=dotnet-build /app/dotnet/out .

# This is the corrected step: copy the React build directly into the wwwroot folder
COPY --from=react-build /app/react/build ./wwwroot

# Expose port and set entrypoint
EXPOSE 8080
ENTRYPOINT ["dotnet", "dotnet-api.dll"]
