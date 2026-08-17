"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchClient } from "@/shared/lib/fetch-client";
import { AnimatedBoltIcon } from "@/shared/ui/AnimatedBoltIcon";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { Container } from "@/shared/ui/Container";
import { NotFoundState } from "@/shared/ui/NotFoundState";
import { PageGlow } from "@/shared/ui/PageGlow";

import { ApiTester } from "./_components/ApiTester";
import { ProjectHeader } from "./_components/ProjectHeader";
import { ResourceTabs } from "./_components/ResourseTabs";
import { useApiTester } from "./lib/use-api-tester";
import { projectKeys } from "./model/project-keys";
import type { Project } from "./model/types";

export function ProjectDetails({ id }: { id: string }) {
  const { data: project, isLoading } = useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => fetchClient.get<Project>(`/projects/${id}`),
    enabled: Boolean(id),
  });

  const tester = useApiTester(project);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <AnimatedBoltIcon size={40} variant="loader" />
      </div>
    );
  }

  if (!project) {
    return <NotFoundState title="Проект не найден" />;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950 pt-24 pb-16 text-white">
      <PageGlow />

      <Container className="relative z-10">
        <Breadcrumbs />

        <ProjectHeader
          name={project.name}
          delay={project.delay}
          errorRate={project.errorRate}
          defaultLimit={project.defaultLimit ?? 20}
        />

        <ResourceTabs
          resources={tester.resources}
          activeResource={tester.resource}
          onSelect={tester.selectResource}
        />

        <ApiTester
          apiUrl={tester.apiUrl}
          defaultLimit={tester.defaultLimit}
          limitOverride={tester.limitOverride}
          onLimitChange={tester.setLimitOverride}
          copied={tester.copied}
          onCopy={tester.handleCopy}
          isTesting={tester.isTesting}
          onTest={tester.handleTest}
          testResponse={tester.testResponse}
          responseStatus={tester.responseStatus}
          responseExpanded={tester.responseExpanded}
          onResponseExpandedChange={tester.setResponseExpanded}
        />
      </Container>
    </section>
  );
}
