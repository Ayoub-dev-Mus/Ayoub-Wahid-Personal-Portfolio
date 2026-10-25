import fs from "node:fs";
import path from "node:path";
import { projects, type Project } from "@/content/projects";

/** Drops a project when its screenshot is not in /public yet, then numbers the rest. */
export function visibleProjects(list: Project[] = projects): Project[] {
  return list
    .filter((project) => fs.existsSync(path.join(process.cwd(), "public", project.image.replace(/^\//, ""))))
    .map((project, index) => ({ ...project, number: String(index + 1).padStart(2, "0") }));
}
