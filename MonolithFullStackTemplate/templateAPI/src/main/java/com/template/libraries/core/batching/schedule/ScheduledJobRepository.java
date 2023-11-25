package com.template.libraries.core.batching.schedule;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduledJobRepository extends JpaRepository<ScheduledJob, String> {
    List<ScheduledJob> findByScheduledDateTimeBefore(LocalDateTime now);
}
