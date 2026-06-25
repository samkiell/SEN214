import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useFonts, Orbitron_400Regular, Orbitron_700Bold } from '@expo-google-fonts/orbitron';
import { theme } from './src/theme';
import { Display } from './src/components/Display';
import { Keypad } from './src/components/Keypad';
import { InputModal } from './src/components/InputModal';
import { calculate } from './src/mathEngine';
import { KeyConfig } from './src/keyLayouts';

export default function App() {
  const [fontsLoaded] = useFonts({
    Orbitron_400Regular,
    Orbitron_700Bold,
  });

  // State Management
  const [tokens, setTokens] = useState<string[]>([]);
  const [result, setResult] = useState<string>('0');
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [isScientificMode, setIsScientificMode] = useState<boolean>(false);
  
  // Modal State
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'nPr' | 'nCr' | 'STAT' | null>(null);

  // Loading Screen if fonts are not loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accentCyan} />
      </View>
    );
  }

  // Live preview calculator helper
  const getLivePreview = (tokenList: string[]): string => {
    if (tokenList.length === 0) return '0';
    const expr = tokenList.join('');
    
    // Check if the last token is an operator or bracket to avoid partial expression errors
    const lastToken = tokenList[tokenList.length - 1];
    if (
      ['+', '-', '*', '/', '^', '('].includes(lastToken) ||
      lastToken.endsWith('(')
    ) {
      // Return empty string to prevent flashing errors during typing
      return '';
    }

    const preview = calculate(expr);
    return preview === 'Error' ? '' : preview;
  };

  // Keyboard and interaction handler
  const handleKeyPress = (key: KeyConfig) => {
    // 1. Recover from Error state if display is showing Error
    if (result === 'Error') {
      setTokens([]);
      setResult('0');
      setIsEvaluated(false);
      
      // If the action is a clear or deletion, we just reset and stop
      if (key.value === 'AC' || key.value === 'DEL' || key.value === '=') {
        return;
      }
    }

    // 2. Handle Action keys
    if (key.value === 'AC') {
      setTokens([]);
      setResult('0');
      setIsEvaluated(false);
      return;
    }

    if (key.value === 'DEL') {
      if (isEvaluated) {
        setTokens([]);
        setResult('0');
        setIsEvaluated(false);
      } else {
        if (tokens.length > 0) {
          setTokens((prev) => prev.slice(0, -1));
        }
      }
      return;
    }

    if (key.value === '=') {
      const expr = tokens.join('');
      const finalResult = calculate(expr);
      setResult(finalResult);
      setIsEvaluated(true);
      return;
    }

    // 3. Handle Modal keys
    if (key.type === 'modal') {
      setModalType(key.value as 'nPr' | 'nCr' | 'STAT');
      setIsModalVisible(true);
      return;
    }

    // 4. Handle token inputs
    if (isEvaluated) {
      // If evaluated, start new expression unless operator is clicked
      if (key.type === 'operator') {
        if (result !== 'Error' && result !== '0') {
          setTokens([result, key.value]);
        } else {
          setTokens([key.value]);
        }
      } else {
        setTokens([key.value]);
      }
      setIsEvaluated(false);
    } else {
      setTokens((prev) => [...prev, key.value]);
    }
  };

  // Insert value from nPr/nCr modal
  const handleInsertModalValue = (val: string) => {
    if (isEvaluated) {
      setTokens([val]);
      setIsEvaluated(false);
    } else {
      setTokens((prev) => [...prev, val]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
      
      {/* Header Panel */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NEON CALCULATOR</Text>
        <Text style={styles.headerSubtitle}>SEN-214 EDITION</Text>
      </View>

      {/* Main Display Panel */}
      <View style={styles.displayContainer}>
        <Display
          expression={tokens.join('')}
          result={isEvaluated ? result : getLivePreview(tokens)}
          isPreview={!isEvaluated}
        />
      </View>

      {/* Keyboard Panel */}
      <View style={styles.keypadContainer}>
        <Keypad
          isScientificMode={isScientificMode}
          setScientificMode={setIsScientificMode}
          onKeyPress={handleKeyPress}
        />
      </View>

      {/* Helper Input Modal (nPr, nCr, STAT) */}
      <InputModal
        visible={isModalVisible}
        type={modalType}
        onClose={() => {
          setIsModalVisible(false);
          setModalType(null);
        }}
        onInsert={handleInsertModalValue}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: 20,
    color: theme.colors.accentMagenta,
    letterSpacing: 2,
    textShadowColor: theme.colors.accentMagenta,
    textShadowRadius: 6,
  },
  headerSubtitle: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 10,
    color: theme.colors.accentCyan,
    letterSpacing: 4,
    marginTop: 2,
    textShadowColor: theme.colors.accentCyan,
    textShadowRadius: 4,
  },
  displayContainer: {
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  keypadContainer: {
    flex: 1,
    paddingBottom: 16,
    paddingHorizontal: 4,
  },
});
