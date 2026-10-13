const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function fileExists(candidate) {
  try {
    return candidate && fs.existsSync(candidate);
  } catch (error) {
    return false;
  }
}

function normalizePath(candidate) {
  if (!candidate) return '';
  return candidate.trim();
}

function findPhpExecutable() {
  const candidates = [];

  for (const envVar of ['PHP_PATH', 'PHP_BINARY', 'PHP']) {
    const value = normalizePath(process.env[envVar]);
    if (value) candidates.push(value);
  }

  if (process.platform === 'win32') {
    candidates.push(
      'C:/xampp/php/php.exe',
      'C:/php/php.exe',
      'C:/Program Files/php/php.exe',
      'C:/Program Files (x86)/php/php.exe'
    );
  } else {
    candidates.push('/usr/bin/php', '/usr/local/bin/php');
  }

  for (const candidate of candidates) {
    if (fileExists(candidate)) return candidate;
  }

  if (process.platform === 'win32') {
    const roots = [
      process.env.ProgramFiles,
      process.env['ProgramFiles(x86)'],
      'C:/xampp',
      'C:/php'
    ].filter(Boolean);

    for (const root of roots) {
      const phpPath = path.join(root, 'php', 'php.exe');
      if (fileExists(phpPath)) return phpPath;
    }
  }

  return null;
}

const phpExecutable = findPhpExecutable();
if (!phpExecutable) {
  console.error('PHP executable not found. Add PHP to PATH or set PHP_PATH to the php binary.');
  process.exit(1);
}

const projectRoot = path.resolve(__dirname, '..');
const child = spawn(phpExecutable, ['-S', '127.0.0.1:8000', '-t', projectRoot], {
  stdio: 'inherit',
  shell: false
});

child.on('error', (error) => {
  console.error(`Failed to start PHP server: ${error.message}`);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
