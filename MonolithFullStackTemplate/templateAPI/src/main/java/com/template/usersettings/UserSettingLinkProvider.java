package com.template.usersettings;

import com.template.libraries.rest.LinkBuilder;
import com.template.users.UserRestService;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.hateoas.Link;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Map;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserSettingLinkProvider  {
    private final LinkBuilder linkBuilder;

    public Link generateGetAllUserSettingsLink(Long userId) {
        if (Objects.isNull(userId)) {
            return null;
        }

        return linkBuilder.buildLink(
                UserSettingRestService.class,
                "getAllSettingsForUser",
                "userSettings",
                Map.of("userId", userId));
    }

}
