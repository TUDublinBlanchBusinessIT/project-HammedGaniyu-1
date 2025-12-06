// theme.js

export const colors = {
  background: "#0D0D0D",
  card: "#1A1A1A",
  primary: "#E10600",      // strong red
  primaryDark: "#990400",  // darker red for shadows
  accent: "#FF453A",       // bright accent red
  textLight: "#FFFFFF",
  textMuted: "#B3B3B3",
  textDarkMuted: "#777",
  border: "#333",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fonts = {
  h1: 32,
  h2: 24,
  h3: 18,
  body: 16,
  small: 14,
};

export const common = {
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
    alignItems: "center",
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: spacing.lg,
  },

  input: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    color: colors.textLight,
    fontSize: fonts.body,
    marginBottom: spacing.md,
  },

  primaryButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: spacing.md,
  },

  primaryButtonText: {
    color: colors.textLight,
    fontSize: fonts.h3,
    fontWeight: "bold",
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },

  secondaryButtonText: {
    color: colors.textMuted,
    fontSize: fonts.body,
  },
};
