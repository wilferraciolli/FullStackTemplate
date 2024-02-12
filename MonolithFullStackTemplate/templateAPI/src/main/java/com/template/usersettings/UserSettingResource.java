package com.template.usersettings;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.template.libraries.rest.BaseDTO;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@JsonRootName("userSetting")
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@ToString
public class UserSettingResource extends BaseDTO {
    @JsonProperty("id")
    private String id;

    @JsonProperty("userId")
    @NotNull(message = "{userSetting.userId.null}")
    private Long userId;

    @JsonProperty("settingUserType")
    @NotNull(message = "{userSetting.userType.null}")
    private SettingUserType settingUserType;

    @JsonProperty("settingCode")
    @NotNull(message = "{userSetting.code.null}")
    private SettingCode settingCode;

    @JsonProperty("settingValue")
    @NotEmpty(message = "{userSetting.value.blank}")
    @Size(max = 80, message = "{userSetting.value.tooLong}")
    private String settingValue;
}
