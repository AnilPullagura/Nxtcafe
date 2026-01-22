const fs = require('fs');
const path = require('path');

// Fix the nested ajv-keywords issue in fork-ts-checker-webpack-plugin
const problematicPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'fork-ts-checker-webpack-plugin',
  'node_modules',
  'ajv-keywords',
  'keywords',
  '_formatLimit.js'
);

if (fs.existsSync(problematicPath)) {
  try {
    let content = fs.readFileSync(problematicPath, 'utf8');
    
    // Fix the issue - the error is at line 63 where formats is undefined
    // We need to add a check before accessing formats[name]
    if (content.includes('var format = formats[name];')) {
      // Replace the problematic line with a safe version
      content = content.replace(
        /var format = formats\[name\];/g,
        'var format = (formats && formats[name]) ? formats[name] : undefined;'
      );
      
      // Also fix any other direct accesses to formats[name]
      content = content.replace(
        /formats\[name\]/g,
        '(formats && formats[name] ? formats[name] : undefined)'
      );
      
      // Fix the extendFormats function to handle undefined formats
      if (content.includes('function extendFormats')) {
        content = content.replace(
          /function extendFormats\([^)]*\)\s*\{/,
          'function extendFormats(ajv, keyword) {\n  if (!ajv || !ajv._opts || !ajv._opts.formats) return;'
        );
      }
      
      fs.writeFileSync(problematicPath, content, 'utf8');
      console.log('✅ Fixed nested ajv-keywords dependency');
    } else {
      console.log('ℹ️  File structure different, attempting alternative fix...');
      // Try to find and fix the extendFormats function directly
      const lines = content.split('\n');
      const fixedLines = lines.map((line, index) => {
        // Fix line 63 area where the error occurs
        if (line.includes('formats[name]') || (index >= 60 && index <= 65 && line.includes('format'))) {
          return line.replace(/formats\[name\]/g, '(formats && formats[name] ? formats[name] : undefined)');
        }
        return line;
      });
      fs.writeFileSync(problematicPath, fixedLines.join('\n'), 'utf8');
      console.log('✅ Applied alternative fix to nested ajv-keywords dependency');
    }
  } catch (error) {
    console.warn('⚠️  Could not patch nested dependency:', error.message);
  }
} else {
  console.log('ℹ️  Nested dependency not found, skipping patch');
}
