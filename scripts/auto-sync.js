import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const WATCH_DIRS = ['src', 'public'];
const WATCH_FILES = ['index.html', 'package.json', 'vite.config.js', 'tailwind.config.js'];
const DEBOUNCE_MS = 5000; // Wait 5 seconds after last change before pushing

let timer = null;
let isPushing = false;

function runCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { cwd: process.cwd() }, (error, stdout, stderr) => {
      if (error) {
        reject(stderr || stdout || error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function triggerSync() {
  if (isPushing) return;
  isPushing = true;

  try {
    const status = await runCommand('git status --porcelain');
    if (!status) {
      console.log('⚡ [Auto-Sync] No changes to push.');
      isPushing = false;
      return;
    }

    const timestamp = new Date().toLocaleString();
    console.log(`\n🚀 [Auto-Sync] Changes detected at ${timestamp}. Syncing to GitHub...`);

    await runCommand('git add .');
    await runCommand(`git commit -m "Auto-update: ${timestamp}"`);
    console.log('✅ [Auto-Sync] Committed changes.');

    const pushResult = await runCommand('git push origin main');
    console.log('🎉 [Auto-Sync] Successfully pushed to GitHub!\n', pushResult);
  } catch (err) {
    console.error('❌ [Auto-Sync] Push failed:', err);
  } finally {
    isPushing = false;
  }
}

function scheduleSync(filename) {
  if (!filename) return;
  // Ignore git, node_modules, dist, temp files
  if (filename.includes('.git') || filename.includes('node_modules') || filename.includes('dist')) {
    return;
  }

  console.log(`📝 [Auto-Sync] File changed: ${filename}. Auto-push in ${DEBOUNCE_MS / 1000}s...`);
  if (timer) clearTimeout(timer);
  timer = setTimeout(triggerSync, DEBOUNCE_MS);
}

// Start watching
console.log('👀 [Auto-Sync] Watching for changes. Any file change will auto-commit and push to GitHub!');

WATCH_DIRS.forEach((dir) => {
  const dirPath = path.resolve(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    fs.watch(dirPath, { recursive: true }, (eventType, filename) => {
      scheduleSync(filename);
    });
  }
});

WATCH_FILES.forEach((file) => {
  const filePath = path.resolve(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    fs.watch(filePath, (eventType, filename) => {
      scheduleSync(filename);
    });
  }
});
