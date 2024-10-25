#Build stage

FROM gradle:latest AS BUILD
WORKDIR /usr/app/
COPY . . 
RUN gradle clean build -x test

# Package stage

FROM eclipse-temurin:17-jre
RUN adduser --system --group app-user

COPY --from=build --chown=app-user:app-user usr/app/build/libs/campus_rating_system-0.0.1-SNAPSHOT.jar ./app.jar

EXPOSE 8080
# ENTRYPOINT exec java -jar $APP_HOME/build/libs/$JAR_NAME
USER app-user
ENTRYPOINT ["java", "-jar", "app.jar"]