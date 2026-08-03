"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api, getAccessToken, Project, User } from "@/shared/lib/api";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Dashboard() {
  const router = useRouter();
  const token = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      return () => window.removeEventListener("storage", onStoreChange);
    },
    getAccessToken,
    () => null,
  );

  const { data: user, isLoading: userLoading, isError: userError, isFetched } = useQuery({
    queryKey: ["me", token],
    queryFn: () => api.get<User>("/auth/me"),
    enabled: !!token,
    retry: false,
    staleTime: 0,
  });

  const { data: projects, isLoading: projectsLoading, refetch } = useQuery({
    queryKey: ["projects", token],
    queryFn: () => api.get<Project[]>("/projects"),
    enabled: !!user,
    retry: false,
  });

  useEffect(() => {
    const storedToken = getAccessToken();
    if (!storedToken) {
      router.replace("/login");
      return;
    }

    if (isFetched && (userError || !user)) {
      router.replace("/login");
    }
  }, [isFetched, userError, user, router]);

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить проект?")) return;
    try {
      await api.delete(`/projects/${id}`);
      refetch();
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Произошла ошибка при удалении проекта");
      }
    }
  };

  if (!token || userLoading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8">
        <Skeleton className="h-8 w-64 bg-slate-800" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const canCreate = (user.projectsCount || 0) < user.maxProjects;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Мои проекты</h1>
            <p className="text-slate-400 mt-1">
              {user.projectsCount} / {user.maxProjects} проектов
            </p>
          </div>
          {canCreate ? (
            <Link href="/projects/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Новый проект
              </Button>
            </Link>
          ) : (
            <Badge variant="secondary" className="bg-slate-800 text-slate-400">
              Лимит достигнут
            </Badge>
          )}
        </div>

        {projectsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-40 bg-slate-800" />
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-white">{project.name}</CardTitle>
                      <CardDescription className="text-slate-400 mt-1 font-mono text-sm">
                        /api/{project.endpointKey}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/project/${project.id}`}>
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-300 hover:bg-red-950"
                        onClick={() => handleDelete(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span>Задержка: {project.delay}ms</span>
                    <span>•</span>
                    <span>Ошибки: {project.errorRate}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">У вас пока нет проектов</p>
            <p className="mt-2">Создайте первый Mock API</p>
          </div>
        )}
      </div>
    </div>
  );
}
