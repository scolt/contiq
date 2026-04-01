import { ProjectSettings } from "@/features/projects/components/ProjectSettings/ProjectSettings";
import { getSources } from "@/features/projects/queries/getSources";

interface ProjectSettingsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectSettingsPage({
  params,
}: ProjectSettingsPageProps) {
  const { id } = await params;
  const initialSources = await getSources(id);
  return <ProjectSettings projectId={id} initialSources={initialSources} />;
}
