import React, { useState } from 'react';
import { Code, Copy, Check, Smartphone, Layers, ShieldCheck } from 'lucide-react';
import { VIECLAB_TOKENS } from '../types';

type TabType = 'tokens' | 'button' | 'input' | 'bottomSheet';
type PlatformType = 'react' | 'flutter' | 'reactNative';

export const CodeGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tokens');
  const [platform, setPlatform] = useState<PlatformType>('react');
  const [copied, setCopied] = useState(false);

  const handleCopy = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCodeContent = (): string => {
    switch (activeTab) {
      case 'tokens':
        if (platform === 'react') {
          return `// tailwind.config.js or CSS Theme
export const VIECLAB_THEME = {
  colors: {
    primary: '${VIECLAB_TOKENS.primary}',       // Royal Blue
    accent: '${VIECLAB_TOKENS.accent}',         // Sky Blue
    success: '${VIECLAB_TOKENS.success}',       // Semantic Success
    warning: '${VIECLAB_TOKENS.warning}',       // Semantic Warning
    error: '${VIECLAB_TOKENS.error}',         // Semantic Error
    bgLight: '${VIECLAB_TOKENS.bgLight}',
    bgDark: '${VIECLAB_TOKENS.bgDark}',
    white: '#FFFFFF',
  },
  borderRadius: {
    card: '${VIECLAB_TOKENS.borderRadiusCard}',            // 20px
    button: '${VIECLAB_TOKENS.borderRadiusButton}',        // 16px
    inputChip: '${VIECLAB_TOKENS.borderRadiusInputChip}',  // 12px
  },
  boxShadow: {
    floating: '0 8px 24px rgba(21, 101, 192, 0.04)',
    floatingDark: '0 8px 24px rgba(0, 0, 0, 0.3)',
  }
};`;
        } else if (platform === 'flutter') {
          return `import 'package:flutter/material.dart';

class VieclabTheme {
  // Brand Colors
  static const Color primary = Color(0xFF1565C0);
  static const Color secondary = Color(0xFFFFFFFF);
  static const Color accent = Color(0xFF42A5F5);

  // Semantic Colors
  static const Color success = Color(0xFF00C853);
  static const Color warning = Color(0xFFFF9800);
  static const Color error = Color(0xFFE53935);

  // Backgrounds
  static const Color bgLight = Color(0xFFF5F7FA);
  static const Color bgDark = Color(0xFF0A0E17);

  // Borders & Shapes (As required: Card=20, Button=16, Input/Chip=12)
  static BorderRadius cardRadius = BorderRadius.circular(20.0);
  static BorderRadius buttonRadius = BorderRadius.circular(16.0);
  static BorderRadius inputChipRadius = BorderRadius.circular(12.0);

  // Soft Floating Shadow
  static List<BoxShadow> floatingShadow = [
    BoxShadow(
      color: const Color(0xFF1565C0).withOpacity(0.04),
      offset: const Offset(0, 8),
      blurRadius: 24,
    ),
  ];

  static ThemeData get lightTheme {
    return ThemeData(
      primaryColor: primary,
      scaffoldBackgroundColor: bgLight,
      fontFamily: 'Inter',
      cardTheme: CardTheme(
        color: secondary,
        shape: RoundedRectangleBorder(borderRadius: cardRadius),
        elevation: 0,
      ),
    );
  }
}`;
        } else {
          return `import { StyleSheet } from 'react-native';

export const VIECLAB_TOKENS = {
  colors: {
    primary: '${VIECLAB_TOKENS.primary}',
    secondary: '${VIECLAB_TOKENS.secondary}',
    accent: '${VIECLAB_TOKENS.accent}',
    success: '${VIECLAB_TOKENS.success}',
    warning: '${VIECLAB_TOKENS.warning}',
    error: '${VIECLAB_TOKENS.error}',
    bgLight: '${VIECLAB_TOKENS.bgLight}',
    bgDark: '${VIECLAB_TOKENS.bgDark}',
  },
  borderRadius: {
    card: 20,
    button: 16,
    inputChip: 12,
  }
};

export const globalStyles = StyleSheet.create({
  card: {
    borderRadius: VIECLAB_TOKENS.borderRadius.card,
    backgroundColor: VIECLAB_TOKENS.colors.secondary,
    padding: 20,
    // Soft Floating Shadow (Y: 8px, Blur: 24px, Opacity 0.04)
    shadowColor: VIECLAB_TOKENS.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
  },
  button: {
    borderRadius: VIECLAB_TOKENS.borderRadius.button,
    backgroundColor: VIECLAB_TOKENS.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  }
});`;
        }

      case 'button':
        if (platform === 'react') {
          return `// Atomic React Button with Ripple Effect
import React, { useState, useLayoutEffect } from 'react';

export const VieclabButton = ({ children, variant = 'primary', onClick, ...props }) => {
  const [ripples, setRipples] = useState([]);
  
  const handleMouseDown = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    setRipples([...ripples, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      size,
      id: Date.now()
    }]);
    if (onClick) onClick(e);
  };

  useLayoutEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => setRipples(r => r.slice(1)), 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <button
      onMouseDown={handleMouseDown}
      className={\`relative overflow-hidden font-sans font-semibold rounded-[16px] px-6 py-3.5 text-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-98 \${
        variant === 'primary' 
          ? 'bg-[#1565C0] text-white hover:bg-[#0D47A1] shadow-lg shadow-[#1565C0]/5' 
          : 'bg-white text-[#1565C0] border border-slate-100'
      }\`}
      {...props}
    >
      {ripples.map(r => (
        <span
          key={r.id}
          className="absolute rounded-full pointer-events-none bg-white/30"
          style={{
            left: r.x - r.size/2,
            top: r.y - r.size/2,
            width: r.size,
            height: r.size,
            transform: 'scale(0)',
            animation: 'ripple-anim 0.6s linear forwards'
          }}
        />
      ))}
      {children}
    </button>
  );
};`;
        } else if (platform === 'flutter') {
          return `// Custom Ripple Button for Flutter
import 'package:flutter/material.dart';

class VieclabButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final bool isPrimary;
  final Widget? icon;

  const VieclabButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.isPrimary = true,
    this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16.0), // Button shape = 16px
        boxShadow: isPrimary ? [
          BoxShadow(
            color: const Color(0xFF1565C0).withOpacity(0.04),
            offset: const Offset(0, 8),
            blurRadius: 24,
          )
        ] : null,
      ),
      child: Material(
        color: isPrimary ? const Color(0xFF1565C0) : Colors.white,
        borderRadius: BorderRadius.circular(16.0),
        child: InkWell(
          onTap: onPressed,
          borderRadius: BorderRadius.circular(16.0),
          splashColor: Colors.white.withOpacity(0.15), // Native Ripple effect
          highlightColor: Colors.transparent,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 16.0, horizontal: 24.0),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                if (icon != null) ...[
                  icon!,
                  const SizedBox(width: 8),
                ],
                Text(
                  text,
                  style: TextStyle(
                    color: isPrimary ? Colors.white : const Color(0xFF1565C0),
                    fontWeight: FontWeight.w600,
                    fontSize: 14,
                    fontFamily: 'Inter',
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}`;
        } else {
          return `// React Native Pressable Button with Ripple (Android) and Opacity (iOS)
import React from 'react';
import { Pressable, Text, StyleSheet, Platform, View } from 'react-native';

export const VieclabButton = ({ text, onPress, isPrimary = true, icon }) => {
  return (
    <View style={styles.shadowContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
        style={({ pressed }) => [
          styles.button,
          isPrimary ? styles.primary : styles.secondary,
          pressed && Platform.OS === 'ios' && { opacity: 0.8 }
        ]}
      >
        <View style={styles.content}>
          {icon}
          <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 4,
    borderRadius: 16,
  },
  button: {
    borderRadius: 16, // Button radius = 16px
    paddingVertical: 14,
    paddingHorizontal: 24,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#1565C0',
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#1565C0',
  },
});`;
        }

      case 'input':
        if (platform === 'react') {
          return `// React Input with 12px Radius and 2px Focus Glow Ring
import React from 'react';

export const VieclabInput = ({ label, error, helperText, ...props }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <span className="text-slate-600 font-semibold text-xs">{label}</span>}
      <input
        className={\`
          w-full px-4 py-3 bg-white border rounded-[12px] text-sm font-sans transition-all duration-300
          \${error 
            ? 'border-red-500 ring-2 ring-red-500/10' 
            : 'border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1565C0]/40 focus:border-[#1565C0]'
          }
        \`}
        {...props}
      />
      {(error || helperText) && (
        <span className={\`text-xs \${error ? 'text-red-500 font-medium' : 'text-slate-400'}\`}>
          {error || helperText}
        </span>
      )}
    </div>
  );
};`;
        } else if (platform === 'flutter') {
          return `// Flutter Input with Focus Glow (2px ring decoration)
import 'package:flutter/material.dart';

class VieclabInput extends StatefulWidget {
  final String label;
  final String? hintText;
  final bool hasError;
  final String? helperText;
  final TextEditingController? controller;

  const VieclabInput({
    Key? key,
    required this.label,
    this.hintText,
    this.hasError = false,
    this.helperText,
    this.controller,
  }) : super(key: key);

  @override
  _VieclabInputState createState() => _VieclabInputState();
}

class _VieclabInputState extends State<VieclabInput> {
  final FocusNode _focusNode = FocusNode();
  bool _isFocused = false;

  @override
  void initState() {
    super.initState();
    _focusNode.addListener(() {
      setState(() {
        _isFocused = _focusNode.hasFocus;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    Color ringColor = widget.hasError
        ? const Color(0xFFE53935).withOpacity(0.2)
        : const Color(0xFF1565C0).withOpacity(0.4);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          widget.label,
          style: const TextStyle(
            fontSize: 12,
            fontWeight: FontWeight.w600,
            color: Color(0xFF475569),
          ),
        ),
        const SizedBox(height: 6),
        AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12.0), // Input shape = 12px
            border: Border.all(
              color: widget.hasError
                  ? const Color(0xFFE53935)
                  : (_isFocused ? const Color(0xFF1565C0) : const Color(0xFFCBD5E1)),
              width: 1.0,
            ),
            // Active Focus Glow 2px Ring
            boxShadow: _isFocused || widget.hasError ? [
              BoxShadow(
                color: ringColor,
                spreadRadius: 2.0,
                blurRadius: 0.0,
              )
            ] : null,
          ),
          child: TextField(
            focusNode: _focusNode,
            controller: widget.controller,
            decoration: InputDecoration(
              hintText: widget.hintText,
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 14.0),
              isDense: true,
            ),
            style: const TextStyle(
              fontSize: 14,
              color: Color(0xFF1E293B),
            ),
          ),
        ),
        if (widget.helperText != null) ...[
          const SizedBox(height: 4),
          Text(
            widget.helperText!,
            style: TextStyle(
              fontSize: 11,
              color: widget.hasError ? const Color(0xFFE53935) : const Color(0xFF94A3B8),
            ),
          ),
        ]
      ],
    );
  }
}`;
        } else {
          return `// React Native Input with Custom Focus Glow State
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

export const VieclabInput = ({ label, error, helperText, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          error && styles.inputError,
          // Custom Active Focus Glow 2px Ring emulation
          isFocused && { borderColor: '#1565C0', borderWidth: 1.5 }
        ]}
      >
        <TextInput
          style={styles.textInput}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor="#94A3B8"
          {...props}
        />
      </View>
      {(error || helperText) && (
        <Text style={[styles.helper, error && styles.helperError]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 6,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12, // Input radius = 12px
    height: 48,
    justifyContent: 'center',
  },
  inputFocused: {
    // Glow overlay shadow emulation
    shadowColor: '#1565C0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  inputError: {
    borderColor: '#E53935',
  },
  textInput: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#1E293B',
    fontFamily: 'Inter',
  },
  helper: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  helperError: {
    color: '#E53935',
  },
});`;
        }

      case 'bottomSheet':
        if (platform === 'react') {
          return `// React Bottom Sheet using Framer Motion
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VieclabBottomSheet = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative w-full max-w-lg bg-white rounded-t-[24px] shadow-2xl p-6 z-10"
          >
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
            <div className="flex items-center justify-between mb-4 border-b pb-2">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100">✕</button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};`;
        } else if (platform === 'flutter') {
          return `// Flutter Modal Bottom Sheet wrapper
import 'package:flutter/material.dart';

void showVieclabBottomSheet({
  required BuildContext context,
  required String title,
  required Widget child,
}) {
  showModalBottomSheet(
    context: context,
    isScrollControlled: true,
    backgroundColor: Colors.transparent,
    builder: (BuildContext context) {
      return Container(
        decoration: const BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(24.0),
            topRight: Radius.circular(24.0),
          ),
        ),
        padding: EdgeInsets.only(
          bottom: MediaQuery.of(context).viewInsets.bottom,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 12),
            Container(
              width: 48,
              height: 5,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.between,
                children: [
                  Text(
                    title,
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Inter',
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close),
                    onPressed: () => Navigator.pop(context),
                  )
                ],
              ),
            ),
            const Divider(height: 1),
            Flexible(
              child: SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                child: child,
              ),
            ),
          ],
        ),
      );
    },
  );
}`;
        } else {
          return `// React Native Modal Bottom Sheet using react-native-modal or native BottomSheet
import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Animated } from 'react-native';

export const VieclabBottomSheet = ({ visible, onClose, title, children }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.dragHandle} />
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>
          <View style={styles.content}>
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  dragHandle: {
    width: 48,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    fontFamily: 'Inter',
  },
  closeBtn: {
    padding: 6,
  },
  closeText: {
    fontSize: 16,
    color: '#64748B',
  },
  content: {
    paddingTop: 16,
  },
});`;
        }
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[20px] overflow-hidden flex flex-col h-[520px]">
      {/* Top bar with tabs */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-accent" />
          <span className="text-white font-bold text-sm tracking-tight">Code Export Studio</span>
        </div>
        
        {/* Platform selection tabs */}
        <div className="flex bg-slate-900 rounded-[12px] p-1 border border-slate-800">
          <button
            onClick={() => { setPlatform('react'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[10px] transition-all duration-200 ${platform === 'react' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            React TSX
          </button>
          <button
            onClick={() => { setPlatform('flutter'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[10px] transition-all duration-200 ${platform === 'flutter' ? 'bg-accent text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            Flutter Dart
          </button>
          <button
            onClick={() => { setPlatform('reactNative'); }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-[10px] transition-all duration-200 ${platform === 'reactNative' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'}`}
          >
            React Native
          </button>
        </div>
      </div>

      {/* Secondary Bar - Component type selection */}
      <div className="bg-slate-900 px-6 py-3 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tokens')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${activeTab === 'tokens' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Global Tokens
          </button>
          <button
            onClick={() => setActiveTab('button')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${activeTab === 'button' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Atomic Button
          </button>
          <button
            onClick={() => setActiveTab('input')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${activeTab === 'input' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Atomic Input
          </button>
          <button
            onClick={() => setActiveTab('bottomSheet')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 ${activeTab === 'bottomSheet' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Bottom Sheet
          </button>
        </div>

        <button
          onClick={() => handleCopy(getCodeContent())}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-success animate-scale-up" />
              <span className="text-success">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Text Area */}
      <div className="flex-1 overflow-auto bg-slate-950 p-6 font-mono text-xs text-slate-300 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800">
        <pre className="whitespace-pre">{getCodeContent()}</pre>
      </div>

      {/* Footer detailing conformity */}
      <div className="bg-slate-900 border-t border-slate-800 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span className="flex items-center gap-1">
          <Layers className="w-3 h-3 text-slate-600" />
          60-30-10 Design Compliant
        </span>
        <span className="flex items-center gap-1">
          <Smartphone className="w-3 h-3 text-slate-600" />
          Responsive Layout Core
        </span>
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500/80" />
          Production-Ready Generator
        </span>
      </div>
    </div>
  );
};
