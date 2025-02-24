package com.company.blog;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlogApplication {
	private static final Logger logger = LoggerFactory.getLogger(  //로그 메시지 출력
			BlogApplication.class
	);

	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
		logger.info("Application started");
	}

}
