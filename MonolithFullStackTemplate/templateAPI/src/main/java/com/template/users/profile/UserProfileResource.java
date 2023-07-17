package com.template.users.profile;

import org.springframework.hateoas.RepresentationModel;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeName;
import com.template.libraries.rest.BaseDTO;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Value;

import java.util.List;

/**
 * The type User profile resource.
 */
@JsonRootName("userProfile")
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
@EqualsAndHashCode
@ToString
public class UserProfileResource extends BaseDTO {

    private Long id;
    private Long personId;
    private String username;
    private String firstName;
    private String lastName;
    private List<String> roleIds;
}
