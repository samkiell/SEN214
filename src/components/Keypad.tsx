import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { CalcButton } from './CalcButton';
import { basicLayout, scientificLayout, KeyConfig } from '../keyLayouts';
import { theme } from '../theme';

interface KeypadProps {
  isScientificMode: boolean;
  setScientificMode: (mode: boolean) => void;
  onKeyPress: (key: KeyConfig) => void;
}

export const Keypad: React.FC<KeypadProps> = ({
  isScientificMode,
  setScientificMode,
  onKeyPress,
}) => {
  const layout = isScientificMode ? scientificLayout : basicLayout;

  return (
    <View style={styles.container}>
      {/* Custom Segmented Control (Mode Toggle) */}
      <View style={styles.toggleContainer}>
        <Pressable
          style={[
            styles.toggleButton,
            !isScientificMode && styles.toggleActiveBasic,
          ]}
          onPress={() => setScientificMode(false)}
        >
          <Text
            style={[
              styles.toggleText,
              !isScientificMode
                ? styles.toggleTextActiveBasic
                : styles.toggleTextInactive,
            ]}
          >
            BASIC
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.toggleButton,
            isScientificMode && styles.toggleActiveSci,
          ]}
          onPress={() => setScientificMode(true)}
        >
          <Text
            style={[
              styles.toggleText,
              isScientificMode
                ? styles.toggleTextActiveSci
                : styles.toggleTextInactive,
            ]}
          >
            SCIENTIFIC
          </Text>
        </Pressable>
      </View>

      {/* Grid of Keys */}
      <View style={styles.grid}>
        {layout.map((row, rowIndex) => (
          <View key={`row-${rowIndex}`} style={styles.row}>
            {row.map((key, keyIndex) => (
              <CalcButton
                key={`key-${rowIndex}-${keyIndex}`}
                label={key.label}
                type={key.type}
                isScientificMode={isScientificMode}
                onPress={() => onKeyPress(key)}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.keyBgDefault,
    borderRadius: 14,
    padding: 3,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
  },
  toggleActiveBasic: {
    backgroundColor: theme.colors.background,
    borderWidth: 1.5,
    borderColor: theme.colors.accentMagenta,
    shadowColor: theme.colors.accentMagenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
  },
  toggleActiveSci: {
    backgroundColor: theme.colors.background,
    borderWidth: 1.5,
    borderColor: theme.colors.accentCyan,
    shadowColor: theme.colors.accentCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 3,
  },
  toggleText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: 14,
    letterSpacing: 1.5,
  },
  toggleTextActiveBasic: {
    color: theme.colors.accentMagenta,
    textShadowColor: theme.colors.accentMagenta,
    textShadowRadius: 4,
  },
  toggleTextActiveSci: {
    color: theme.colors.accentCyan,
    textShadowColor: theme.colors.accentCyan,
    textShadowRadius: 4,
  },
  toggleTextInactive: {
    color: theme.colors.textMuted,
  },
  grid: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 2,
  },
});
