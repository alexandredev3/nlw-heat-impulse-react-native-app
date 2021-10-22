import React from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ColorValue,
  ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  isLoading?: boolean;
  icon?: React.ComponentProps<typeof AntDesign>['name'];
}

export function Button({
  title,
  color,
  backgroundColor,
  icon,
  isLoading = false,
  ...rest 
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, opacity: isLoading || rest.disabled ? 0.5 : 1 }]} 
      activeOpacity={0.9}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          {icon && (
            <AntDesign
              name={icon}
              size={24}
              style={styles.icon}
            />
          )}
          <Text style={[styles.title, { color }]}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}