import type { Metadata } from "next";
import { getProjectsPageData } from "@/features/projects/queries/getProjects";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse and manage your document intelligence projects.",
  openGraph: {
    title: "Projects",
    description: "Browse and manage your document intelligence projects.",
  },
};

export default async function ProjectsPage() {
  const data = await getProjectsPageData();
  return <ProjectsGrid data={data} />;
}
