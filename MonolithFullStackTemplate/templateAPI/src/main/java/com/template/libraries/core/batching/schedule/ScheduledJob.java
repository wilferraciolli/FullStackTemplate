package com.template.libraries.core.batching.schedule;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "tp_scheduled_job")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduledJob implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    private String rootName;

    // json payload
    private String jobData;

    // expiry date time
    private LocalDateTime scheduledDateTime;
}
