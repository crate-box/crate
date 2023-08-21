import { execSync } from 'node:child_process'

export default function generator(plop) {
  plop.setGenerator("init", {
    description: "Generate a new package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "The name of the package? (Skip `@acme/` prefix)",
      },
      {
        type: "input",
        name: "deps",
        message: "List of dependencies you would like to install (separated by spaces)",
      }
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@acme/")) {
            answers.name = answers.name.replace("@acme/", "")
          }
        }
        return "Config sanitized"
      },
      {
        type: "add",
        path: "packages/{{ name }}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "packages/{{ name }}/index.ts",
        template: "export * from './src'",
      },
      {
        type: "modify",
        path: "packages/{{ name }}/package.json",
        async transform(content, answers) {
          const pkg = JSON.parse(content);
          for (const dep of answers.deps.split(" ").filter(Boolean)) {
            const version = await fetch(
              `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
            )
              .then((res) => res.json())
              .then((json) => json.latest);
            pkg.dependencies[dep] = `^${version}`;
          }
          return JSON.stringify(pkg, null, 2);
        },
      },
      async (answers) => {
        /**
         * Install deps and format everything
         */
        execSync("pnpm manypkg fix", {
          stdio: "inherit",
        });
        execSync(
          `pnpm prettier --write packages/${
            answers.name
          }/** --list-different`,
        );
        return "Package scaffolded";
      },
    ]
  })
}
