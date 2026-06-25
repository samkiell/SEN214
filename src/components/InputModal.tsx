import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { theme } from '../theme';

interface InputModalProps {
  visible: boolean;
  type: 'nPr' | 'nCr' | 'STAT' | null;
  onClose: () => void;
  onInsert: (value: string) => void;
}

export const InputModal: React.FC<InputModalProps> = ({
  visible,
  type,
  onClose,
  onInsert,
}) => {
  const [valN, setValN] = useState('');
  const [valR, setValR] = useState('');
  const [statInput, setStatInput] = useState('');
  
  const [result, setResult] = useState<string | null>(null);
  const [statResults, setStatResults] = useState<{
    mean: string;
    variance: string;
    stdDev: string;
  } | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Helper: factorial
  const factorial = (num: number): number => {
    if (num === 0 || num === 1) return 1;
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };

  // Helper: round to 10 sig figs
  const roundTo10SigFigs = (num: number): number => {
    if (num === 0) return 0;
    if (!isFinite(num)) return num;
    return parseFloat(num.toPrecision(10));
  };

  // Calculate nPr / nCr on changes
  useEffect(() => {
    if (type !== 'nPr' && type !== 'nCr') return;

    setErrorMsg(null);
    setResult(null);

    const n = parseInt(valN, 10);
    const r = parseInt(valR, 10);

    if (valN === '' || valR === '') return;

    if (isNaN(n) || isNaN(r)) {
      setErrorMsg('Inputs must be numbers');
      return;
    }

    if (n < 0 || r < 0) {
      setErrorMsg('Inputs must be non-negative');
      return;
    }

    if (!Number.isInteger(n) || !Number.isInteger(r)) {
      setErrorMsg('Inputs must be integers');
      return;
    }

    if (r > n) {
      setErrorMsg('r cannot be greater than n');
      return;
    }

    try {
      let calcVal = 0;
      if (type === 'nPr') {
        // n! / (n-r)!
        calcVal = factorial(n) / factorial(n - r);
      } else {
        // n! / (r! * (n-r)!)
        calcVal = factorial(n) / (factorial(r) * factorial(n - r));
      }
      setResult(roundTo10SigFigs(calcVal).toString());
    } catch (e) {
      setErrorMsg('Error in calculation');
    }
  }, [valN, valR, type]);

  // Calculate STAT values
  const handleStatCalculate = () => {
    setErrorMsg(null);
    setStatResults(null);

    if (statInput.trim() === '') {
      setErrorMsg('Input cannot be empty');
      return;
    }

    const numbers = statInput
      .split(',')
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) {
      setErrorMsg('No valid numbers provided');
      return;
    }

    const N = numbers.length;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / N;

    // Population variance
    const squaredDiffsSum = numbers.reduce((acc, curr) => acc + Math.pow(curr - mean, 2), 0);
    const variance = squaredDiffsSum / N;
    const stdDev = Math.sqrt(variance);

    setStatResults({
      mean: roundTo10SigFigs(mean).toString(),
      variance: roundTo10SigFigs(variance).toString(),
      stdDev: roundTo10SigFigs(stdDev).toString(),
    });
  };

  const resetState = () => {
    setValN('');
    setValR('');
    setStatInput('');
    setResult(null);
    setStatResults(null);
    setErrorMsg(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleInsert = () => {
    if (result !== null) {
      onInsert(result);
      handleClose();
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {type === 'nPr' && 'Permutations (nPr)'}
            {type === 'nCr' && 'Combinations (nCr)'}
            {type === 'STAT' && 'Statistics Mode'}
          </Text>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {/* Permutations or Combinations */}
            {(type === 'nPr' || type === 'nCr') && (
              <View style={styles.formContainer}>
                <View style={styles.inputRow}>
                  <Text style={styles.label}>n :</Text>
                  <TextInput
                    style={styles.input}
                    value={valN}
                    onChangeText={setValN}
                    placeholder="e.g. 5"
                    placeholderTextColor={theme.colors.textMuted}
                    keyboardType="numeric"
                    autoFocus
                  />
                </View>

                <View style={styles.inputRow}>
                  <Text style={styles.label}>r :</Text>
                  <TextInput
                    style={styles.input}
                    value={valR}
                    onChangeText={setValR}
                    placeholder="e.g. 2"
                    placeholderTextColor={theme.colors.textMuted}
                    keyboardType="numeric"
                  />
                </View>

                {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

                {result !== null && (
                  <View style={styles.resultContainer}>
                    <Text style={styles.resultLabel}>Result:</Text>
                    <Text style={styles.resultValue}>{result}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Statistics */}
            {type === 'STAT' && (
              <View style={styles.formContainer}>
                <Text style={styles.instructionText}>
                  Enter numbers separated by commas:
                </Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={statInput}
                  onChangeText={setStatInput}
                  placeholder="e.g. 10, 20, 30, 40"
                  placeholderTextColor={theme.colors.textMuted}
                  multiline
                  numberOfLines={3}
                />

                <Pressable style={styles.calcBtn} onPress={handleStatCalculate}>
                  <Text style={styles.calcBtnText}>Calculate Stats</Text>
                </Pressable>

                {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

                {statResults && (
                  <View style={styles.statResultsContainer}>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Mean:</Text>
                      <Text style={styles.statValue}>{statResults.mean}</Text>
                    </View>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Variance:</Text>
                      <Text style={styles.statValue}>{statResults.variance}</Text>
                    </View>
                    <View style={styles.statRow}>
                      <Text style={styles.statLabel}>Std Dev:</Text>
                      <Text style={styles.statValue}>{statResults.stdDev}</Text>
                    </View>
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <Pressable style={[styles.actionBtn, styles.cancelBtn]} onPress={handleClose}>
              <Text style={styles.cancelBtnText}>Close</Text>
            </Pressable>

            {(type === 'nPr' || type === 'nCr') && (
              <Pressable
                style={[
                  styles.actionBtn,
                  styles.insertBtn,
                  result === null && styles.disabledBtn,
                ]}
                onPress={handleInsert}
                disabled={result === null}
              >
                <Text style={styles.insertBtnText}>Insert</Text>
              </Pressable>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 5, 8, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.88,
    maxHeight: '80%',
    backgroundColor: theme.colors.displayBg,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: theme.colors.accentMagenta,
    padding: 20,
    shadowColor: theme.colors.accentMagenta,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  modalTitle: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: 20,
    color: theme.colors.accentMagenta,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: theme.colors.accentMagenta,
    textShadowRadius: 4,
  },
  scrollView: {
    marginVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    width: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    fontFamily: theme.typography.fontFamilyBold,
    color: theme.colors.textMain,
    fontSize: 18,
    width: 32,
  },
  instructionText: {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.textMain,
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.borderColor,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 12,
    color: theme.colors.textMain,
    fontFamily: theme.typography.fontFamily,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  calcBtn: {
    backgroundColor: theme.colors.keyBgScientific,
    borderColor: theme.colors.accentYellow,
    borderWidth: 1.5,
    borderRadius: 12,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  calcBtnText: {
    fontFamily: theme.typography.fontFamilyBold,
    color: theme.colors.accentYellow,
    fontSize: 16,
  },
  errorText: {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.accentMagenta,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.accentCyan,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    marginVertical: 16,
  },
  resultLabel: {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.textMain,
    fontSize: 16,
  },
  resultValue: {
    fontFamily: theme.typography.fontFamilyBold,
    color: theme.colors.accentCyan,
    fontSize: 20,
    textShadowColor: theme.colors.accentCyan,
    textShadowRadius: 6,
  },
  statResultsContainer: {
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.accentYellow,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  statLabel: {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.textMain,
    fontSize: 15,
  },
  statValue: {
    fontFamily: theme.typography.fontFamilyBold,
    color: theme.colors.accentYellow,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
    borderWidth: 1.5,
  },
  cancelBtn: {
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.background,
  },
  cancelBtnText: {
    fontFamily: theme.typography.fontFamilyBold,
    color: theme.colors.textMuted,
    fontSize: 16,
  },
  insertBtn: {
    borderColor: theme.colors.accentCyan,
    backgroundColor: theme.colors.keyBgScientific,
  },
  insertBtnText: {
    fontFamily: theme.typography.fontFamilyBold,
    color: theme.colors.accentCyan,
    fontSize: 16,
  },
  disabledBtn: {
    borderColor: theme.colors.borderColor,
    opacity: 0.5,
  },
});
