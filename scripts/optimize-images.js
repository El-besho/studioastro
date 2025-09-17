#!/usr/bin/env node

const sharp = require('sharp');
const glob = require('glob');
const path = require('path');
const fs = require('fs').promises;

// Configuration
const IMAGE_QUALITY = 85;
const SIZES = {
  thumbnail: 150,
  small: 400,
  medium: 800,
  large: 1200,
  xlarge: 1920
};

async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath).toLowerCase();
  const basename = path.basename(imagePath, ext);
  const dirname = path.dirname(imagePath);
  
  // Skip if already optimized
  if (basename.includes('-optimized') || ext === '.webp') {
    return;
  }
  
  console.log(`Optimizing: ${imagePath}`);
  
  try {
    const image = sharp(imagePath);
    const metadata = await image.metadata();
    
    // Generate WebP version
    const webpPath = path.join(dirname, `${basename}.webp`);
    await image
      .webp({ quality: IMAGE_QUALITY })
      .toFile(webpPath);
    
    console.log(`  ✓ Created WebP: ${webpPath}`);
    
    // Generate responsive sizes
    for (const [sizeName, width] of Object.entries(SIZES)) {
      if (metadata.width > width) {
        const resizedPath = path.join(dirname, `${basename}-${sizeName}${ext}`);
        const resizedWebpPath = path.join(dirname, `${basename}-${sizeName}.webp`);
        
        // Original format
        await sharp(imagePath)
          .resize(width, null, { withoutEnlargement: true })
          .jpeg({ quality: IMAGE_QUALITY, progressive: true })
          .toFile(resizedPath);
        
        // WebP format
        await sharp(imagePath)
          .resize(width, null, { withoutEnlargement: true })
          .webp({ quality: IMAGE_QUALITY })
          .toFile(resizedWebpPath);
        
        console.log(`  ✓ Created ${sizeName}: ${width}px`);
      }
    }
    
    // Optimize original
    if (ext === '.jpg' || ext === '.jpeg') {
      const optimizedPath = path.join(dirname, `${basename}-optimized${ext}`);
      await sharp(imagePath)
        .jpeg({ quality: IMAGE_QUALITY, progressive: true })
        .toFile(optimizedPath);
      
      // Replace original with optimized
      await fs.rename(optimizedPath, imagePath);
      console.log(`  ✓ Optimized original`);
    } else if (ext === '.png') {
      const optimizedPath = path.join(dirname, `${basename}-optimized${ext}`);
      await sharp(imagePath)
        .png({ quality: IMAGE_QUALITY, compressionLevel: 9 })
        .toFile(optimizedPath);
      
      // Replace original with optimized
      await fs.rename(optimizedPath, imagePath);
      console.log(`  ✓ Optimized original`);
    }
    
  } catch (error) {
    console.error(`  ✗ Error optimizing ${imagePath}:`, error.message);
  }
}

async function main() {
  // Find all images in public directory
  const patterns = [
    'public/**/*.jpg',
    'public/**/*.jpeg',
    'public/**/*.png',
    'public/**/*.JPG',
    'public/**/*.JPEG',
    'public/**/*.PNG'
  ];
  
  let totalImages = 0;
  
  for (const pattern of patterns) {
    const images = glob.sync(pattern);
    totalImages += images.length;
    
    for (const imagePath of images) {
      await optimizeImage(imagePath);
    }
  }
  
  console.log(`\n✨ Optimization complete! Processed ${totalImages} images.`);
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { optimizeImage };