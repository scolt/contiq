import type { Metadata } from "next";
import { ProjectSettings } from "@/features/projects/components/ProjectSettings/ProjectSettings";
import { getSources } from "@/features/projects/queries/getSources";
import { db } from "@/libs/db/db";
import { projects } from "@/libs/db/schemas/projects";
import { eq } from "drizzle-orm";

interface ProjectSettingsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProjectSettingsPageProps): Promise<Metadata> {
  const { id } = await params;
  const [project] = await db
    .select({ name: projects.name })
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  const title = project ? `${project.name} — Settings` : "Project Settings";
  return {
    title,
    openGraph: { title },
  };
}

export default async function ProjectSettingsPage({
  params,
}: ProjectSettingsPageProps) {
  const { id } = await params;
  const initialSources = await getSources(id);
  return <ProjectSettings projectId={id} initialSources={initialSources} />;
}
