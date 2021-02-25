package com.template.validation;


import com.template.users.UserResource;
import com.template.users.user.UserRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Objects;

@Component
public class ValidateUniqueEmailValidator implements ConstraintValidator<ValidateUniqueEmail, UserResource> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void initialize(ValidateUniqueEmail constraintAnnotation) {
    }

    @Override
    public boolean isValid(final UserResource value, final ConstraintValidatorContext context) {
        boolean result = false;

        // check if blank or empty
        if (Objects.isNull(value)) {

            return true;
        } else {
            if (Objects.isNull(value.getId())) {
                return Long.valueOf(0L).equals(userRepository.checkUsernameExists(value.getUsername()));
            }

            return userRepository.checkUsernameIsAvailableIgnoringSelf(value.getUsername(), value.getId());
        }
    }
}
