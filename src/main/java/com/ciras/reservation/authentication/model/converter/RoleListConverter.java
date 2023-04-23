package com.ciras.reservation.authentication.model.converter;


import com.ciras.reservation.authentication.model.Role;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Arrays;
import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

@Converter
public class RoleListConverter implements AttributeConverter<Set<Role>, String> {

  private static final String SPLIT_CHAR = ";";

  @Override
  public String convertToDatabaseColumn(Set<Role> roleList) {
    return roleList != null ? roleList.stream().map(Role::getAuthority)
        .collect(Collectors.joining(SPLIT_CHAR)) : " ";
  }

  @Override
  public Set<Role> convertToEntityAttribute(String string) {
    return string != null ? Arrays.stream(string.split(SPLIT_CHAR)).map(Role::valueOf)
        .collect(Collectors.toSet()) : Collections.emptySet();
  }
}