import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface DisplayProps {
  expression: string;
  result: string;
  isPreview: boolean;
}

/**
 * Prettifies the raw formula expression for user-friendly display.
 */
export function prettify(expr: string): string {
  if (!expr) return '0';
  return expr
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/asin\(/g, 'sin⁻¹(')
    .replace(/acos\(/g, 'cos⁻¹(')
    .replace(/atan\(/g, 'tan⁻¹(')
    .replace(/sqrt\(/g, '√(')
    .replace(/NEG/g, '-')
    .replace(/π/g, 'π')
    .replace(/e/g, 'e')
    .replace(/\^/g, ' ^ ');
}

export const Display: React.FC<DisplayProps> = ({ expression, result, isPreview }) => {
  const exprScrollRef = useRef<ScrollView>(null);
  const resultScrollRef = useRef<ScrollView>(null);

  // Auto-scroll to the end when content changes
  useEffect(() => {
    if (exprScrollRef.current) {
      exprScrollRef.current.scrollToEnd({ animated: true });
    }
  }, [expression]);

  useEffect(() => {
    if (resultScrollRef.current) {
      resultScrollRef.current.scrollToEnd({ animated: true });
    }
  }, [result]);

  return (
    <View style={styles.container}>
      {/* Expression Area (Top Line) */}
      <View style={styles.expressionWrapper}>
        <ScrollView
          ref={exprScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.expressionText}>
            {prettify(expression)}
          </Text>
        </ScrollView>
      </View>

      {/* Result Area (Bottom Line) */}
      <View style={styles.resultWrapper}>
        <ScrollView
          ref={resultScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text
            style={[
              styles.resultText,
              isPreview ? styles.previewText : styles.finalResultText,
            ]}
          >
            {result}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: theme.colors.displayBg,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderWidth: 1.5,
    borderColor: theme.colors.accentCyan,
    shadowColor: theme.colors.accentCyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  expressionWrapper: {
    height: 36,
    justifyContent: 'center',
    marginBottom: 4,
  },
  resultWrapper: {
    height: 56,
    justifyContent: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  expressionText: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 22,
    color: theme.colors.textMain,
    textAlign: 'right',
  },
  resultText: {
    fontFamily: theme.typography.fontFamilyBold,
    fontSize: 38,
    textAlign: 'right',
  },
  previewText: {
    color: theme.colors.textMuted,
  },
  finalResultText: {
    color: theme.colors.accentCyan,
    textShadowColor: theme.colors.accentCyan,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});
