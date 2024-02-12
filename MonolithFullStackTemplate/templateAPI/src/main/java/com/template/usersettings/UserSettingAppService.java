package com.template.usersettings;

import com.template.exceptions.DomainException;
import com.template.exceptions.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserSettingAppService {

    private final UserSettingRepository repository;

    public List<UserSettingResource> getAllSettingsForUser(Long userId) {
        return repository.findAllByUserId(userId).stream()
                .map(this::mapUserSetting)
                .toList();
    }

    public UserSettingResource getSettingForUserByCode(Long userId, String settingCode) {
        SettingCode code = SettingCode.resolveEnum(settingCode);
        if (Objects.isNull(code)) {
            throw new DomainException("Invalid value provided for setting code");
        }

        return repository.findByUserIdAndSettingCode(userId, code)
                .map(this::mapUserSetting)
                .orElseThrow(() -> new EntityNotFoundException("Could not find user setting for given code"));
    }

    public UserSettingResource createOrUpdate(Long userId, UserSettingResource payload) {
        UserSetting userSetting = repository.findByUserIdAndSettingCode(userId, payload.getSettingCode())
                .map(current -> updateUserSetting(current, payload))
                .orElseGet(() -> createNewUserSetting(userId, payload));

        repository.save(userSetting);

        return mapUserSetting(userSetting);
    }

    private UserSetting updateUserSetting(UserSetting current, UserSettingResource payload) {
        current.updateSetting(payload.getSettingValue());

        return current;
    }

    private UserSetting createNewUserSetting(Long userId, UserSettingResource payload) {
        return UserSetting.builder()
                .userId(userId)
                .settingUserType(payload.getSettingUserType())
                .settingCode(payload.getSettingCode())
                .settingValue(payload.getSettingValue())
                .build();
    }

    private UserSettingResource mapUserSetting(UserSetting userSetting) {
        return UserSettingResource.builder()
                .id(userSetting.getId())
                .userId(userSetting.getUserId())
                .settingCode(userSetting.getSettingCode())
                .settingUserType(userSetting.getSettingUserType())
                .settingValue(userSetting.getSettingValue())
                .build();
    }
}
