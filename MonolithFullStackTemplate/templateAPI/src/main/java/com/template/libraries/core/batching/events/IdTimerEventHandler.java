package com.template.libraries.core.batching.events;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Service
@Slf4j
public class IdTimerEventHandler {

    @TransactionalEventListener(phase = TransactionPhase.BEFORE_COMMIT)
    public void handleIdTimerEvent(final IdTimerEvent event) {
        log.info(" ********** handling timer {}", event);
    }

}
