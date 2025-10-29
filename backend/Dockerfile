# Multi-stage build for optimal image size
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build
COPY src ./src
RUN mvn clean package -DskipTests

# Runtime stage with smaller image
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Render sets PORT environment variable
ENV PORT=8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-Xmx512m", "-jar", "app.jar"]