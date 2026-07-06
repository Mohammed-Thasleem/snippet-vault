import { designSystem } from "./design-system";

export const colorValues = {
  background: {
    primary: "#0B0F14",
    secondary: "#111827",
    tertiary: "#1F2937",
    elevated: "#252D38",
  },
  surface: {
    base: "#1F2937",
    elevated: "#252D38",
  },
  border: {
    subtle: "#2D3748",
    default: "#374151",
    strong: "#4B5563",
  },
  text: {
    primary: "#E5E7EB",
    secondary: "#9CA3AF",
    tertiary: "#6B7280",
    inverse: "#111827",
  },
  accent: {
    primary: "#3B82F6",
    primaryHover: "#2563EB",
    secondary: "#8B5CF6",
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  },
};

export const colors = {
  background: {
    primary: "bg-[#0B0F14]",
    secondary: "bg-[#111827]",
    tertiary: "bg-[#1F2937]",
    elevated: "bg-[#252D38]",
  },
  surface: {
    base: "bg-[#1F2937]",
    elevated: "bg-[#252D38]",
    hover: "hover:bg-[#2D3748]",
  },
  border: {
    subtle: "border-[#2D3748]",
    default: "border-[#374151]",
    strong: "border-[#4B5563]",
  },
  text: {
    primary: "text-[#E5E7EB]",
    secondary: "text-[#9CA3AF]",
    tertiary: "text-[#6B7280]",
    inverse: "text-[#111827]",
  },
  accent: {
    primary: "bg-[#3B82F6]",
    primaryHover: "hover:bg-[#2563EB]",
    secondary: "bg-[#8B5CF6]",
    success: "bg-[#10B981]",
    warning: "bg-[#F59E0B]",
    error: "bg-[#EF4444]",
  },
};

export const buttonStyles = {
  primary: `px-4 py-3 ${colors.accent.primary} ${colors.accent.primaryHover} text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-[#3B82F6]/20`,
  secondary: `px-4 py-3 ${colors.surface.base} hover:${colors.surface.elevated} ${colors.text.primary} border ${colors.border.subtle} rounded-lg font-medium transition-all duration-200`,
  gradient: `px-4 py-3 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white rounded-lg font-semibold transition-all duration-200 shadow-lg shadow-[#3B82F6]/20`,
};

export const inputStyles = `w-full px-4 py-3 ${colors.surface.base} border ${colors.border.subtle} rounded-lg ${colors.text.primary} placeholder:${colors.text.tertiary} focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all duration-200`;

export const textareaStyles = `w-full px-4 py-3 ${colors.surface.base} border ${colors.border.subtle} rounded-lg ${colors.text.primary} placeholder:${colors.text.tertiary} focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all duration-200 resize-none`;

export const codeEditorStyles = `w-full px-4 py-3 ${colors.background.primary} border ${colors.border.subtle} rounded-lg ${colors.text.primary} placeholder:${colors.text.tertiary} focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all duration-200 font-mono text-sm resize-none`;

export const cardStyles = `${colors.surface.base} border ${colors.border.subtle} rounded-xl overflow-hidden hover:border-[#374151] hover:shadow-lg hover:shadow-black/20 transition-all duration-200`;

export const tagChipStyles = `px-2.5 py-1 ${colors.surface.elevated} border ${colors.border.default} rounded-full text-xs font-medium ${colors.text.secondary}`;

export const badgeStyles = `inline-flex items-center gap-1.5 px-2.5 py-1 ${colors.surface.elevated} border ${colors.border.default} rounded-lg text-xs font-medium ${colors.accent.primary}`;

export const codeBlockContainerStyles = `${colors.background.primary} border ${colors.border.subtle} rounded-xl overflow-hidden`;

export const codeBlockHeaderStyles = `${colors.surface.base} border-b ${colors.border.subtle} px-4 py-2 flex items-center justify-between`;

export const sidebarStyles = `w-64 ${colors.surface.base} border-r ${colors.border.subtle} h-screen sticky top-0`;

export const navbarStyles = `${colors.surface.base} border-b ${colors.border.subtle} sticky top-0 z-10`;

export const navLinkActiveStyles = `flex items-center gap-3 px-4 py-3 ${colors.accent.primary} text-white rounded-lg shadow-lg shadow-[#3B82F6]/20`;

export const navLinkInactiveStyles = `flex items-center gap-3 px-4 py-3 ${colors.text.secondary} hover:${colors.surface.elevated} hover:${colors.text.primary} rounded-lg transition-all duration-200`;

export const searchInputStyles = `w-full pl-12 pr-4 py-3 ${colors.background.secondary} border ${colors.border.subtle} rounded-lg ${colors.text.primary} placeholder:${colors.text.tertiary} focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all duration-200`;
