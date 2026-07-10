"use client";

import { useEffect, useState } from "react";
import { supabase, Snippet } from "@/lib/supabase";
import { Navbar } from "@/components/navbar";
import { SnippetCard } from "@/components/snippet-card";
import { EmptyState } from "@/components/empty-state";
import { SkeletonGrid } from "@/components/loading-skeleton";
import { Code as Code2 } from "lucide-react";
import { colorValues } from "@/lib/design-tokens";

export default function DashboardPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchSnippets();
    fetchFavorites();
  }, []);

  const fetchSnippets = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from("snippets")
        .select("*")
        .eq("user_id", user.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSnippets(data || []);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      const { data, error } = await supabase
        .from("favorites")
        .select("snippet_id")
        .eq("user_id", user.user.id);

      if (error) throw error;
      setFavorites(new Set(data?.map((f) => f.snippet_id) || []));
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (snippetId: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) return;

      if (favorites.has(snippetId)) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.user.id)
          .eq("snippet_id", snippetId);

        if (error) throw error;
        setFavorites((prev) => {
          const next = new Set(prev);
          next.delete(snippetId);
          return next;
        });
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.user.id, snippet_id: snippetId });

        if (error) throw error;
        setFavorites((prev) => new Set([...Array.from(prev), snippetId]));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const filteredSnippets = snippets.filter((snippet) => {
    const query = searchQuery.toLowerCase();
    return (
      snippet.title.toLowerCase().includes(query) ||
      snippet.language.toLowerCase().includes(query) ||
      snippet.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      snippet.code.toLowerCase().includes(query)
    );
  });

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colorValues.background.primary }}
    >
      <Navbar onSearch={setSearchQuery} />

      <div className="p-8">
        <div className="mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: colorValues.text.primary }}
          >
            My Snippets
          </h1>
          <p style={{ color: colorValues.text.secondary }}>
            {snippets.length} {snippets.length === 1 ? "snippet" : "snippets"}{" "}
            saved
          </p>
        </div>

        {loading ? (
          <SkeletonGrid />
        ) : filteredSnippets.length === 0 ? (
          <EmptyState
            icon={Code2}
            title={searchQuery ? "No snippets found" : "No snippets yet"}
            description={
              searchQuery
                ? "Try adjusting your search query"
                : "Start building your code library by creating your first snippet"
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map((snippet) => (
              <SnippetCard
                key={snippet.id}
                id={snippet.id}
                title={snippet.title}
                code={snippet.code}
                language={snippet.language}
                tags={snippet.tags}
                createdAt={snippet.created_at}
                isFavorite={favorites.has(snippet.id)}
                onFavoriteToggle={() => toggleFavorite(snippet.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
