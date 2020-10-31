package com.template;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.template"})
public class SpringTemplateApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringTemplateApplication.class, args);
	}

}
