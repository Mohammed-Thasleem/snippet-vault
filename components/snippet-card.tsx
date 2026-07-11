"use client";

import Link from "next/link";
import { Clock, Code as Code2, Heart } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { colorValues } from "@/lib/design-tokens";

interface SnippetCardProps {
  id: string;
  title: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: string;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
}

export function SnippetCard({
  id,
  title,
  code,
  language,
  tags,
  createdAt,
  isFavorite = false,
  onFavoriteToggle,
}: SnippetCardProps) {
  const preview = code.split("\n").slice(0, 3).join("\n");
  const truncatedPreview =
    preview.length > 150 ? preview.slice(0, 150) + "..." : preview;

  return (
    <div
      className="group border rounded-xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: colorValues.surface.base,
        borderColor: colorValues.border.subtle,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = colorValues.border.default;
        e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colorValues.border.subtle;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <Link href={`/dashboard/snippet/${id}`} className="block">
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3
              className="text-lg font-semibold line-clamp-1 transition-colors duration-200"
              style={{ color: colorValues.text.primary }}
            >
              {title}
            </h3>
            {onFavoriteToggle && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onFavoriteToggle();
                }}
                className="p-1.5 rounded-lg transition-colors duration-200 hover:opacity-80"
                style={{ backgroundColor: colorValues.surface.elevated }}
              >
                <Heart
                  className="w-5 h-5"
                  style={{
                    color: isFavorite
                      ? colorValues.accent.error
                      : colorValues.text.tertiary,
                  }}
                  fill={isFavorite ? colorValues.accent.error : "none"}
                />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-lg text-xs font-medium"
              style={{
                backgroundColor: colorValues.surface.elevated,
                borderColor: colorValues.border.default,
                color: colorValues.accent.primary,
              }}
            >
              <Code2 className="w-3.5 h-3.5" />
              {language}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs"
              style={{ color: colorValues.text.tertiary }}
            >
              <Clock className="w-3.5 h-3.5" />
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </span>
          </div>

          <div
            className="border rounded-lg p-3 mb-4"
            style={{
              backgroundColor: colorValues.background.primary,
              borderColor: colorValues.border.subtle,
            }}
          >
            <pre
              className="text-xs font-mono overflow-hidden"
              style={{ color: colorValues.text.secondary }}
            >
              <code>{truncatedPreview}</code>
            </pre>
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 border rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: colorValues.surface.elevated,
                    borderColor: colorValues.border.default,
                    color: colorValues.text.secondary,
                  }}
                >
                  {tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span
                  className="px-2.5 py-1 text-xs font-medium"
                  style={{ color: colorValues.text.tertiary }}
                >
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
