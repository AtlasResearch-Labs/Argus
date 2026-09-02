/**
 * Argus Universal Git Diff Parser
 * Parses raw git unified diffs into structured file hunks and line mappings
 */

export function parseGitDiff(rawDiff) {
  if (!rawDiff || typeof rawDiff !== 'string') return [];

  const files = [];
  const rawFiles = rawDiff.split(/^diff --git /m).filter(Boolean);

  for (const rawFile of rawFiles) {
    const lines = rawFile.split('\n');
    const headerLine = lines[0] || '';
    
    // Extract file paths: a/path/to/file b/path/to/file
    const match = headerLine.match(/a\/(.+?)\s+b\/(.+)/);
    const oldPath = match ? match[1] : '';
    const newPath = match ? match[2] : (lines[1]?.replace(/^[\+\-]{3} [ab]\//, '') || 'unknown');

    // Skip binary files, lock files, and sourcemaps
    if (
      newPath.endsWith('.lock') || 
      newPath.endsWith('.lockb') || 
      newPath.endsWith('-lock.json') || 
      newPath.endsWith('.map') || 
      newPath.endsWith('.min.js') || 
      newPath.endsWith('.min.css') ||
      newPath.endsWith('.png') ||
      newPath.endsWith('.jpg') ||
      newPath.endsWith('.svg') ||
      newPath.endsWith('.ico')
    ) {
      continue;
    }

    const hunks = [];
    let currentHunk = null;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      // Match hunk header: @@ -oldStart,oldLines +newStart,newLines @@
      if (line.startsWith('@@')) {
        const hunkMatch = line.match(/@@\s+-(\d+)(?:,(\d+))?\s+\+(\d+)(?:,(\d+))?\s+@@(.*)/);
        if (hunkMatch) {
          currentHunk = {
            oldStart: parseInt(hunkMatch[1], 10),
            oldLines: parseInt(hunkMatch[2] || '1', 10),
            newStart: parseInt(hunkMatch[3], 10),
            newLines: parseInt(hunkMatch[4] || '1', 10),
            header: line,
            lines: []
          };
          hunks.push(currentHunk);
        }
        continue;
      }

      if (currentHunk) {
        currentHunk.lines.push(line);
      }
    }

    if (hunks.length > 0) {
      files.push({
        oldPath,
        newPath,
        hunks,
        rawDiff: rawFile
      });
    }
  }

  return files;
}

export function extractChangedSnippet(file) {
  const snippets = [];
  for (const hunk of file.hunks) {
    let currentLineNumber = hunk.newStart;
    const hunkCode = [];

    for (const line of hunk.lines) {
      if (line.startsWith('+')) {
        hunkCode.push({ line: currentLineNumber, type: 'ADD', content: line.slice(1) });
        currentLineNumber++;
      } else if (line.startsWith('-')) {
        hunkCode.push({ line: null, type: 'DEL', content: line.slice(1) });
      } else if (line.startsWith(' ')) {
        hunkCode.push({ line: currentLineNumber, type: 'CTX', content: line.slice(1) });
        currentLineNumber++;
      }
    }

    snippets.push({
      hunkHeader: hunk.header,
      code: hunkCode
    });
  }

  return snippets;
}
