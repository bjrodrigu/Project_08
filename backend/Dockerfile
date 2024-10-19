# Use the Gradle image for the build stage
FROM gradle:8.1.1-jdk17 AS builder

# Set the working directory
WORKDIR /app

# Copy Gradle files first to take advantage of Docker caching
COPY build.gradle settings.gradle gradle ./

# Build the application (this will create the jar file)
RUN gradle build --no-daemon

# Copy the source code
COPY src ./src

# Create the fat jar with bootJar (produces the jar for deployment)
RUN gradle bootJar --no-daemon

# Use a lightweight JRE image for the final stage
FROM eclipse-temurin:17-jre

# Set the working directory for the final image
WORKDIR /app

# Copy the jar file from the builder stage
COPY --from=builder /app/build/libs/*.jar app.jar

# Expose the application on port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
