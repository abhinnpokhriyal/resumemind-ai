import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
 
const textExtensions = new Set(["txt", "text"]);
 
function extensionOf(name: string) {
  return name.toLowerCase().split(".").pop() ?? "";
}
 
export async function extractTextFromFile(file: File) {
  const ext = extensionOf(file.name);
  const buffer = Buffer.from(await file.arrayBuffer());
 
  if (ext === "pdf") {
    const parser = new PDFParse({ data: buffer });
    try {
      const result = await parser.getText();
      return result.text;
    } finally {
      await parser.destroy();
    }
  }
 
  if (ext === "docx") {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
 
  if (textExtensions.has(ext)) {
    return buffer.toString("utf8");
  }
 
  throw new Error("Unsupported file type. Use PDF, DOCX, or TXT.");
}
