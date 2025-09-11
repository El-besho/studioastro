#!/usr/bin/env node

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { gzipSync } from 'zlib';
import { BundleAnalyzer, BundleOptimizer } from '../src/lib/bundle-analysis.ts';

const DIST_DIR = './dist';

function getFileType(filename) {
  const ext = extname(filename).toLowerCase();
  
  if (['.js', '.mjs', '.cjs'].includes(ext)) return 'js';
  if (['.css'].includes(ext)) return 'css';
  if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.avif'].includes(ext)) return 'image';
  if (['.woff', '.woff2', '.ttf', '.otf', '.eot'].includes(ext)) return 'font';
  
  return 'other';
}

function getGzippedSize(filePath) {
  try {
    const content = readFileSync(filePath);
    const gzipped = gzipSync(content);
    return gzipped.length;
  } catch (error) {
    console.warn(`Could not gzip ${filePath}:`, error.message);
    return null;
  }
}

function analyzeDirectory(dir, analyzer, basePath = '') {
  const items = readdirSync(dir);
  
  for (const item of items) {
    const fullPath = join(dir, item);
    const relativePath = join(basePath, item);
    const stats = statSync(fullPath);
    
    if (stats.isDirectory()) {
      analyzeDirectory(fullPath, analyzer, relativePath);
    } else {
      const fileType = getFileType(item);
      const size = stats.size;
      const gzippedSize = getGzippedSize(fullPath);
      
      analyzer.addBundle(item, size, fileType, relativePath, gzippedSize);
    }
  }
}

function main() {
  console.log('🔍 Analyzing bundle...\n');
  
  const analyzer = new BundleAnalyzer();
  
  try {
    analyzeDirectory(DIST_DIR, analyzer);
  } catch (error) {
    console.error('❌ Error analyzing bundle:', error.message);
    console.log('Make sure to run "npm run build" first.');
    process.exit(1);
  }
  
  const analysis = analyzer.analyze();
  
  // Generate and display report
  console.log(analyzer.generateReport());
  
  // Generate optimization plan
  console.log('\n' + BundleOptimizer.generateOptimizationPlan(analysis));
  
  // Performance budget check
  const performanceBudgets = {
    js: 500 * 1024, // 500KB
    css: 100 * 1024, // 100KB
    total: 1000 * 1024, // 1MB
  };
  
  console.log('\n## Performance Budget Check\n');
  
  const jsBundles = analysis.bundles.filter(b => b.type === 'js');
  const cssBundles = analysis.bundles.filter(b => b.type === 'css');
  
  const totalJsSize = jsBundles.reduce((sum, b) => sum + b.size, 0);
  const totalCssSize = cssBundles.reduce((sum, b) => sum + b.size, 0);
  
  console.log(`JavaScript bundles: ${formatBytes(totalJsSize)} / ${formatBytes(performanceBudgets.js)} ${totalJsSize > performanceBudgets.js ? '❌' : '✅'}`);
  console.log(`CSS bundles: ${formatBytes(totalCssSize)} / ${formatBytes(performanceBudgets.css)} ${totalCssSize > performanceBudgets.css ? '❌' : '✅'}`);
  console.log(`Total size: ${formatBytes(analysis.totalSize)} / ${formatBytes(performanceBudgets.total)} ${analysis.totalSize > performanceBudgets.total ? '❌' : '✅'}`);
  
  // Exit with error if budgets are exceeded
  if (analysis.totalSize > performanceBudgets.total || totalJsSize > performanceBudgets.js || totalCssSize > performanceBudgets.css) {
    console.log('\n❌ Performance budgets exceeded!');
    process.exit(1);
  } else {
    console.log('\n✅ All performance budgets met!');
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

main();