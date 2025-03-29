import { readdir, readFile } from "fs/promises"
import { join } from "path"

async function findPrismaReferences(dir: string, ignoreDirs: string[] = []): Promise<string[]> {
  const results: string[] = []

  try {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const path = join(dir, entry.name)

      // Skip ignored directories
      if (entry.isDirectory() && ignoreDirs.includes(entry.name)) {
        continue
      }

      if (entry.isDirectory()) {
        const subResults = await findPrismaReferences(path, ignoreDirs)
        results.push(...subResults)
      } else if (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx") || entry.name.endsWith(".js")) {
        try {
          const content = await readFile(path, "utf8")
          if (content.includes("prisma") || content.includes("@prisma/client")) {
            results.push(path)
          }
        } catch (error) {
          console.error(`Error reading file ${path}:`, error)
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error)
  }

  return results
}

async function main() {
  const ignoreDirs = ["node_modules", ".next", ".git", "prisma"]
  const results = await findPrismaReferences(".", ignoreDirs)

  if (results.length === 0) {
    console.log("No Prisma references found!")
  } else {
    console.log("Prisma references found in the following files:")
    results.forEach((file) => console.log(`- ${file}`))
  }
}

main().catch(console.error)

