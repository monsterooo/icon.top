const { glob } = require("glob");
const fs = require("fs");
const path = require("path");

const dirPath = "/git/lucide/icons";

async function main() {
  const iconFiles = await glob(`${dirPath}/*.json`, {
    ignore: "node_modules/**",
  });
  let finalResult = [];

  /**
   * {
        "p": "assets/lucide", // path
        "n": "a-arrow-down.svg", // name
        "t": ["letter", "font size", "text", "formatting", "smaller" ] //tag
      }
   */
  await iconFiles.map(async (filePath) => {
    const name = path.basename(path.basename(filePath));
    const file = await fs.readFileSync(filePath, { encoding: "utf-8" });
    const json = JSON.parse(file);
    finalResult.push({
      p: "assets/lucide",
      n: name,
      t: [...json.tags].concat(json.aliases).filter((v) => !!v),
    });
  });

  console.log(JSON.stringify(finalResult));
}

main();
