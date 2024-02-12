package com.template.usersettings;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserSettingRepository extends JpaRepository<UserSetting, UUID> {

    List<UserSetting> findAllByUserId(@NotNull Long userId);

    Optional<UserSetting> findByUserIdAndSettingCode(@NotNull Long userId, @NotNull SettingCode settingCode);
}
