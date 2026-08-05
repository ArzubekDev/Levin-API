"use client";

import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { api } from "@/shared/lib/api";
import { Label } from "@/shared/components/ui/label";
import { Slider } from "@/shared/components/ui/slider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Container } from "@/shared/ui/Container";

const DEFAULT_SCHEMA = {
  users: {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string", faker: "person.fullName" },
      email: { type: "string", faker: "internet.email" },
      age: { type: "integer", minimum: 18, maximum: 65 },
      role: { type: "string", enum: ["admin", "user", "guest"] },
      isActive: { type: "boolean" }
    }
  }
};

interface CreateProjectInput {
  name: string;
  schemaJson: Record<string, unknown>;
  delay?: number;
  errorRate?: number;
}

export function NewProject() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [schemaText, setSchemaText] = useState(JSON.stringify(DEFAULT_SCHEMA, null, 2));
  const [delay, setDelay] = useState([0]);
  const [errorRate, setErrorRate] = useState([0]);

  const createMutation = useMutation({
    mutationFn: (data: CreateProjectInput) => api.post("/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/dashboard");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to create project");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const schemaJson = JSON.parse(schemaText);
      createMutation.mutate({
        name,
        schemaJson,
        delay: delay[0],
        errorRate: errorRate[0],
      });
    } catch {
      alert("Invalid JSON in schema");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-8">
      <Container size="narrow">
        <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>New Mock API</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Project name</Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="My store"
                  className="bg-slate-800 border-slate-700"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>JSON Schema</Label>
                <Textarea
                  value={schemaText}
                  onChange={(e) => setSchemaText(e.target.value)}
                  className="bg-slate-800 border-slate-700 font-mono text-sm min-h-75"
                  required
                />
                <p className="text-xs text-slate-500">
                  Describe the data structure. Object key = resource name (users, products, etc.)
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Response delay: {delay[0]}ms</Label>
                  <Slider
                    value={delay}
                    onValueChange={(value) => setDelay(value as number[])}
                    max={5000}
                    step={100}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Error rate: {errorRate[0]}%</Label>
                  <Slider
                    value={errorRate}
                    onValueChange={(value) => setErrorRate(value as number[])}
                    max={50}
                    step={1}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? "Creating..." : "Create API"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
