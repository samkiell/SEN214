import React from 'react';
import { Pressable, Text, StyleSheet, Dimensions } from 'react-native';
import { theme } from '../theme';

interface CalcButtonProps {
  label: string;
  onPress: () => void;
  type: 'digit' | 'operator' | 'function' | 'constant' | 'action' | 'modal';
  isScientificMode: boolean;
}

const { width } = Dimensions.get('window');

export const CalcButton: React.FC<CalcButtonProps> = ({
  label,
  onPress,
  type,
  isScientificMode,
}) => {
  // Determine text and border colors based on key type
  let textColor = theme.colors.textMain;
  let borderColor = theme.colors.borderColor;
  let keyBg = theme.colors.keyBgDefault;

  if (type === 'operator') {
    textColor = theme.colors.accentCyan;
    borderColor = theme.colors.accentCyan;
    keyBg = theme.colors.keyBgOperator;
  } else if (type === 'action') {
    textColor = theme.colors.accentMagenta;
    borderColor = theme.colors.accentMagenta;
    keyBg = theme.colors.background;
  } else if (type === 'function') {
    textColor = theme.colors.accentYellow;
    borderColor = theme.colors.accentYellow;
    keyBg = theme.colors.keyBgScientific;
  } else if (type === 'constant') {
    textColor = theme.colors.textMain;
    borderColor = theme.colors.borderColor;
    keyBg = theme.colors.keyBgScientific;
  } else if (type === 'modal') {
    textColor = theme.colors.accentYellow;
    borderColor = theme.colors.accentYellow;
    keyBg = theme.colors.keyBgScientific;
  }

  // Adjust button sizes dynamically based on screen width and mode (4 or 5 columns)
  const columns = isScientificMode ? 5 : 4;
  const paddingGaps = 8 * (columns + 1);
  const buttonWidth = (width - paddingGaps) / columns;
  const buttonHeight = isScientificMode ? 50 : 64;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          width: buttonWidth,
          height: buttonHeight,
          backgroundColor: pressed ? theme.colors.background : keyBg,
          borderColor: pressed ? theme.colors.textMain : borderColor,
          shadowOpacity: pressed ? 0.9 : 0.2,
          shadowColor: textColor,
        },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.squircle,
    borderWidth: 1.5,
    margin: 4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: 18,
    textAlign: 'center',
  },
});
