"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Code as Code2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { colorValues } from "@/lib/design-tokens";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Check your email to confirm your account!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: colorValues.background.primary }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="relative w-full max-w-md">
        <div
          className="border rounded-2xl shadow-2xl overflow-hidden"
          style={{
            backgroundColor: colorValues.surface.base,
            borderColor: colorValues.border.subtle,
          }}
        >
          <div className="p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-2xl flex items-center justify-center mb-4">
                <Code2 className="w-9 h-9 text-white" />
              </div>
              <h1
                className="text-3xl font-bold mb-2"
                style={{ color: colorValues.text.primary }}
              >
                Snippet Vault
              </h1>
              <p
                className="text-center"
                style={{ color: colorValues.text.secondary }}
              >
                {isSignUp ? "Create your account" : "Welcome back"}
              </p>
            </div>

            {error && (
              <div
                className="mb-6 p-4 border rounded-lg"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  borderColor: "rgba(239, 68, 68, 0.2)",
                }}
              >
                <p
                  className="text-sm"
                  style={{ color: colorValues.accent.error }}
                >
                  {error}
                </p>
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colorValues.text.primary }}
                >
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: colorValues.text.tertiary }}
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all duration-200"
                    style={{
                      backgroundColor: colorValues.background.secondary,
                      borderColor: colorValues.border.subtle,
                      color: colorValues.text.primary,
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        colorValues.accent.primary)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        colorValues.border.subtle)
                    }
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: colorValues.text.primary }}
                >
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: colorValues.text.tertiary }}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-3 border rounded-lg outline-none transition-all duration-200"
                    style={{
                      backgroundColor: colorValues.background.secondary,
                      borderColor: colorValues.border.subtle,
                      color: colorValues.text.primary,
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        colorValues.accent.primary)
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        colorValues.border.subtle)
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] hover:from-[#2563EB] hover:to-[#7C3AED] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-[#3B82F6]/20"
              >
                {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm transition-colors duration-200 hover:opacity-80"
                style={{ color: colorValues.text.secondary }}
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>

          <div
            className="px-8 py-4 border-t"
            style={{
              backgroundColor: colorValues.background.secondary,
              borderColor: colorValues.border.subtle,
            }}
          >
            <p
              className="text-xs text-center"
              style={{ color: colorValues.text.tertiary }}
            >
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
