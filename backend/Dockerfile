# Build stage
FROM gradle:8.10.2-jdk17 AS build
WORKDIR /usr/app/
COPY . .
# Tests need a live database, so they are skipped in the image build.
RUN gradle clean bootJar -x test --no-daemon

# Package stage
FROM eclipse-temurin:17-jre
RUN adduser --system --group app-user
COPY --from=build --chown=app-user:app-user /usr/app/build/libs/campus_rating_system-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
USER app-user
ENTRYPOINT ["java", "-jar", "app.jar"]
