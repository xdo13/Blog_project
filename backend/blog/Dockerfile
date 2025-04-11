FROM openjdk:17-jdk-slim
WORKDIR /app
COPY build/libs/*.jar /app/blog.jar
EXPOSE 9090
CMD ["java", "-jar", "/app/blog.jar"]