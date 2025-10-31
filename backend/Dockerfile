# Multi-stage build for optimal image size

FROM maven:3.9-eclipse-temurin-25 AS build

WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)

COPY pom.xml ./pom.xml

RUN mvn dependency:go-offline -B

# Copy source code and build

COPY src ./src

RUN mvn clean package -DskipTests

# Runtime stage with smaller image

FROM eclipse-temurin:25-jre-alpine

WORKDIR /app

# Copy JAR from build stage

COPY --from=build /app/target/*.jar app.jar

# Render sets PORT environment variable

ENV PORT=8080

EXPOSE 8080

# Optimize JVM for containers and faster startup
# -XX:+UseContainerSupport: Respect container memory limits
# -XX:MaxRAMPercentage: Use 75% of available RAM (container-aware)
# -XX:+UseG1GC: G1 garbage collector (good for containers)
# -XX:+UseStringDeduplication: Reduce memory usage
# -Djava.security.egd: Faster secure random (for non-critical use cases)
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC -XX:+UseStringDeduplication -Djava.security.egd=file:/dev/./urandom"

# Run as non-root user for security (alpine doesn't have groupadd/useradd by default, so we'll use addgroup/adduser)
RUN addgroup -S spring && adduser -S spring -G spring && \
    chown -R spring:spring /app

USER spring:spring

# Run the application with optimized JVM options
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]