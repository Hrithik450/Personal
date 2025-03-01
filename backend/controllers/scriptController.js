import path from "path";
import { fileURLToPath } from "url";
import AdmZip from "adm-zip";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function zipDirectory(sourceDir, outputZipPath) {
  const zip = new AdmZip();

  if (!fs.existsSync(sourceDir)) {
    console.log(`❌ Directory not found: ${sourceDir}`);
    return null;
  }

  zip.addLocalFolder(sourceDir);
  zip.writeZip(outputZipPath);

  return outputZipPath;
}

export const getZipFile = (req, res, next) => {
  try {
    const { licenseToken, project } = req.body;

    if (!project) {
      return res
        .status(400)
        .json({ error: "project directory is required in request body" });
    }

    const targetDir = path.resolve(
      __dirname,
      "../config/scripts",
      project,
      "bin"
    );

    const outputZipPath = path.resolve(
      __dirname,
      `../config/scripts/${project}`,
      "bin.zip"
    );

    const zipFile = zipDirectory(targetDir, outputZipPath);
    if (!zipFile) {
      return res.status(404).json({ error: "Bin directory not found" });
    }

    res.download(zipFile, "bin.zip", (err) => {
      if (err) {
        console.error("Error serving file:", err);
        res.status(500).send("Error downloading script");
      }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
