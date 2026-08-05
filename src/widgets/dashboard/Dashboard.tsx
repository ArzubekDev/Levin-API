"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authKeys, useSession } from "@/features/auth";
import { api, Project } from "@/shared/lib/api";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Container } from "@/shared/ui/Container";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Dashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, status, token } = useSession();

  const { data: projects, isLoading: projectsLoading } = useQuery({
    queryKey: authKeys.projects(token),
    queryFn: () => api.get<Project[]>("/projects"),
    enabled: status === "authenticated",
    retry: false,
  });

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/projects/${id}`);
      await queryClient.invalidateQueries({ queryKey: authKeys.all });
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to delete project");
      }
    }
  };

  if (status !== "authenticated" || !user) {
    return (
      <div className="min-h-screen bg-slate-950 p-8">
        <Skeleton className="h-8 w-64 bg-slate-800" />
      </div>
    );
  }

  const canCreate = (user.projectsCount || 0) < user.maxProjects;

  const handleNewProject = () => {
    if (!canCreate) {
      alert("To create more projects, you need to purchase a subscription.");
      return;
    }
    router.push("/projects/new");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-24">
      <Container>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My projects</h1>
            <p className="text-slate-400 mt-1">
              {user.projectsCount} / {user.maxProjects} projects
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleNewProject}>
            <Plus className="mr-2 h-4 w-4" />
            New project
          </Button>
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
                    <span>Delay: {project.delay}ms</span>
                    <span>•</span>
                    <span>Errors: {project.errorRate}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p className="text-lg">You don&apos;t have any projects yet</p>
            <p className="mt-2">Create your first Mock API</p>
          </div>
        )}
      </Container>
    </div>
  );
}
