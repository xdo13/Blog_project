FROM openjdk:17-jdk-slim
WORKDIR /app
COPY /build/libs/blog-1.0.0.jar /app/blog.jar
EXPOSE 9091
CMD ["java", "-jar", "/app/blog.jar"]