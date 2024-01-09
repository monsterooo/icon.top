const { glob } = require("glob");
const fs = require("fs");
const path = require("path");

const dirPath = "/git/tabler-icons-master";
const sourcePath = dirPath + '/src/_icons'
const svgPath = dirPath + '/packages/icons/icons'

async function main() {
  const iconFiles = await glob(`${sourcePath}/*.svg`, {
    ignore: "node_modules/**",
  });
  let finalResult = [];

  await iconFiles.map(async (filePath) => {
    const name = path.basename(filePath);
    const file = await fs.readFileSync(filePath, { encoding: "utf-8" });
    const head = matchHead(file);
    const tags = matchTags(head);
    
    if (fs.existsSync(`${svgPath}/${name}`)) {
      finalResult.push({
        p: "assets/tabler",
        n: name,
        t: tags
      });
    }
  });

  console.log(JSON.stringify(finalResult));
}

function matchHead(text) {
  const regex = /---([\s\S]+?)---/;
  const match = text.match(regex);

  if (match) {
    const contentBetweenDashes = match[1].trim();

    return contentBetweenDashes
  } else {
    throw Error('No content between --- found');
  }
}

function matchTags(text) {
  const regex = /\[([^\]]+)\]/;
  const match = text.match(regex);

  if (match) {
    const tagsString = match[1];
    const tagsArray = tagsString.split(',').map(tag => tag.trim());
    
    return tagsArray
  } else {
    try {
      const regex = /category:\s*(.+)/;
      const match = text.match(regex);

      if (match) {
        const categoryValue = match[1].trim();

        return [categoryValue]
      }
    } catch (error) {
      throw Error('Dont match tags: ')
    }
  }

}

main();

