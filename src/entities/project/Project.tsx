"use client";

import { Copy, Check, Play, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api, type Project } from "@/shared/lib/api";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

export function Project({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", id],
    queryFn: () => api.get<Project>(`/projects/${id}`),
    enabled: Boolean(id),
  });

  const apiUrl = project
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/${project.endpointKey}/users`
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTest = async () => {
    setIsTesting(true);
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setTestResponse(JSON.stringify(data, null, 2));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setTestResponse(error.message);
      } else {
        setTestResponse("Ошибка запроса");
      }
    } finally {
      setIsTesting(false);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-slate-950 p-8 text-white">Загрузка...</div>;
  }

  if (!project) {
    return <div className="min-h-screen bg-slate-950 p-8 text-white">Проект не найден</div>;
  }

  const resources = Object.keys(project.schemaJson);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/dashboard" className="inline-flex items-center text-slate-400 hover:text-white mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад
        </Link>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="border-slate-700 text-slate-400">
                Задержка: {project.delay}ms
              </Badge>
              <Badge variant="outline" className="border-slate-700 text-slate-400">
                Ошибки: {project.errorRate}%
              </Badge>
            </div>
          </div>
        </div>

        <Card className="bg-slate-900 border-slate-800 mb-6">
          <CardHeader>
            <CardTitle className="text-sm text-slate-400">Endpoint URL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-slate-950 p-3 rounded-lg font-mono text-sm text-green-400 overflow-x-auto">
                {apiUrl}
              </code>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-700"
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue={resources[0]} className="w-full">
          <TabsList className="bg-slate-900 border-slate-800">
            {resources.map((r) => (
              <TabsTrigger key={r} value={r} className="data-[state=active]:bg-slate-800">
                {r}
              </TabsTrigger>
            ))}
          </TabsList>

          {resources.map((resource) => (
            <TabsContent key={resource} value={resource}>
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">/{resource}</CardTitle>
                    <Button
                      onClick={handleTest}
                      disabled={isTesting}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {isTesting ? "Загрузка..." : "Тестировать"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {testResponse && (
                    <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-sm text-slate-300 font-mono">
                      {testResponse}
                    </pre>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
