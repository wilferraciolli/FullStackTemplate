package com.template.validation;


import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = {ValidateUniqueEmailValidator.class})
@Target({TYPE})
@Retention(RUNTIME)
public @interface ValidateUniqueEmail {

    /**
     * Message.
     * @return message.
     */
    String message() default "{Users.username.NonUnique}";

    /**
     * Groups.
     * @return an array of Class.
     */
    Class<?>[] groups() default {};

    /**
     * Payload.
     * @return an array of Payloads.
     */
    Class<? extends Payload>[] payload() default {};
}
