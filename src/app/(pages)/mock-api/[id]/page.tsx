import type { Metadata } from "next";

import { ProjectDetails } from "@/entities/project";

type Props = {
  params: Promise<{ id: string }>;
};

const getProject = (id: string) => {
  return { id, name: `Проект ${id}` };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);

  return {
    title: project.name,
    description: `Настройка эндпоинтов, параметров и ответов для мок-проекта ${project.name}.`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  return <ProjectDetails key={id} id={id} />;
}
