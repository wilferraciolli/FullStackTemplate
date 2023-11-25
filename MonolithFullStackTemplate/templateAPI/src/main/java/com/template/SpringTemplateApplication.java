package com.template;

import com.template.libraries.core.batching.events.IdTimerEvent;
import com.template.libraries.core.batching.schedule.SchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.time.LocalDateTime;

@SpringBootApplication
//@CrossOrigin("*")
@EnableAsync
@EnableScheduling
@ComponentScan({"com.template"})
public class SpringTemplateApplication implements CommandLineRunner {

	@Autowired
	private SchedulerService jobSchedulerService;

	public static void main(String[] args) {
		SpringApplication.run(SpringTemplateApplication.class, args);
	}

	@Override
	public void run(String... args) {

		jobSchedulerService.startScheduler();

		// for demo create two timers, they will be added to the job schedule table
		IdTimerEvent firstTimerEvent = new IdTimerEvent("Some id");
		IdTimerEvent secondTimerEvent = new IdTimerEvent("Some id");
		jobSchedulerService.scheduleJob(firstTimerEvent, LocalDateTime.now().plusMinutes(1));
		jobSchedulerService.scheduleJob(secondTimerEvent, LocalDateTime.now().plusMinutes(2));
	}

}
