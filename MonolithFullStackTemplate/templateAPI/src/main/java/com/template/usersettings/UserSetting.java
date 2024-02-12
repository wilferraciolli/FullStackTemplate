package com.template.usersettings;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.GenericGenerator;

import java.io.Serializable;

@Entity
@Table(name = "tp_user_setting")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSetting implements Serializable {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @NotNull
    private Long userId;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SettingUserType settingUserType;

    @NotNull
    @Enumerated(EnumType.STRING)
    private SettingCode settingCode;

    @NotEmpty
    private String settingValue;

    public void updateSetting(String settingValue) {
        this.settingValue = settingValue;
    }
}
