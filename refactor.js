const fs = require('fs');
const path = require('path');

const replacements = [
  { match: /['"]\$lib\/db['"]/g, replace: '"$lib/db/db"' },
  { match: /['"]\$lib\/supabase['"]/g, replace: '"$lib/db/supabase"' },
  { match: /['"]\$lib\/i18n\.svelte['"]/g, replace: '"$lib/i18n/i18n.svelte"' },
  { match: /['"]\$lib\/curriculum['"]/g, replace: '"$lib/core/curriculum"' },
  { match: /['"]\$lib\/dictionaries['"]/g, replace: '"$lib/core/dictionaries"' },
  { match: /['"]\$lib\/generate['"]/g, replace: '"$lib/core/generate"' },
  { match: /['"]\$lib\/keyboardLayouts['"]/g, replace: '"$lib/core/keyboardLayouts"' }
];

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.svelte-kit' && file !== 'build') {
        walk(fullPath);
      }
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.svelte')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const r of replacements) {
        if (content.match(r.match)) {
          content = content.replace(r.match, r.replace);
          changed = true;
        }
      }
      
      // File specific fixes
      if (fullPath.endsWith('src/lib/stores/srs.svelte.ts')) {
        content = content.replace(/['"]\.\.\/db['"]/g, '"../db/db"');
        changed = true;
      }
      if (fullPath.endsWith('src/lib/db/db.ts')) {
        content = content.replace(/['"]\.\/srs\/srs['"]/g, '"../srs/srs"');
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

walk('src');
