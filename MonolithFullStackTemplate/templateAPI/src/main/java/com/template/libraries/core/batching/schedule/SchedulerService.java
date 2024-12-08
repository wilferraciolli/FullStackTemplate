package com.template.libraries.core.batching.schedule;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.template.exceptions.DomainException;
import com.template.libraries.core.EventPublisher;
import com.template.libraries.core.EventScheduled;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.lang.reflect.AnnotatedElement;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ScheduledFuture;

@Service
@Log4j2
public class SchedulerService {
    @Autowired
    private ScheduledJobRepository scheduledJobRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private EventPublisher eventPublisher;

    @Autowired
    private TaskScheduler taskScheduler;

    private ScheduledFuture<?> scheduledTask;

    // TODO this services keeps querying the table non stop, ideally it could be that it would only query it when needed

    public void startScheduler() {
        // periodically monitors the table and run jobs
        if (scheduledTask == null || scheduledTask.isCancelled()) {
            scheduledTask = taskScheduler.scheduleAtFixedRate(this::checkScheduledJobs, Duration.ofDays(10));
        }
    }

    private void checkScheduledJobs() {
        List<ScheduledJob> jobsToRun = scheduledJobRepository.findByScheduledDateTimeBefore(LocalDateTime.now());

        for (ScheduledJob job : jobsToRun) {
            try {
                EventScheduled jobData = objectMapper.readValue(
                        job.getJobData(),
                        ScheduledJobType.getEventClass(job.getRootName())
                );

                publishEventOnScheduledJobExpires(jobData);

                scheduledJobRepository.delete(job);
            } catch (JsonProcessingException e) {
                log.error("Could not deserialize the payload for the schedule job");
                throw new DomainException("Could not Could not deserialize the payload for the schedule job");
            }
        }
    }

    public void scheduleJob(EventScheduled jobData, LocalDateTime scheduledTime) {
        try {
            String serializedData = objectMapper.writeValueAsString(jobData);

            ScheduledJob jobToSchedule = ScheduledJob.builder()
                    .rootName(getJsonRootName(jobData))
                    .jobData(serializedData)
                    .scheduledDateTime(scheduledTime)
                    .build();

            scheduledJobRepository.save(jobToSchedule);
        } catch (JsonProcessingException e) {
            log.error("Could not serialize the payload for the schedule job");
            throw new DomainException("Could not Could not serialize the payload for the schedule job");
        }
    }

    public void publishEventOnScheduledJobExpires(EventScheduled jobData) {
        log.info(" ********** sending timer {}", jobData);
        this.eventPublisher.publishEvent(jobData);
    }

    private String getJsonRootName(EventScheduled event) {
        String jsonRootName = getJsonRootNameFromClass(event.getClass());

        if (StringUtils.isNotEmpty(jsonRootName)) {
            return jsonRootName;
        } else {
            log.error("Class does not have JsonRootName assigned");
            throw new DomainException("Class does not have JsonRootName assigned");
        }
    }

    private String getJsonRootNameFromClass(AnnotatedElement annotatedElement) {
        JsonRootName jsonRootNameAnnotation = annotatedElement.getAnnotation(JsonRootName.class);

        if (jsonRootNameAnnotation != null) {
            return jsonRootNameAnnotation.value();
        }

        return null;
    }
}
