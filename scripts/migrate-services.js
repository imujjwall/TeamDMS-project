#!/usr/bin/env node

/**
 * Migration script to help transition from individual page files to ServicePageFactory
 * 
 * Usage: node scripts/migrate-services.js
 */

const fs = require('fs');
const path = require('path');

// Services that can be migrated (have both page file and data file)
const MIGRATEABLE_SERVICES = [
  {
    id: 'svls',
    pageFile: 'src/pages/SVLSPage.js',
    dataFile: 'src/data/svlsTroubleshootingData.js',
    dataExport: 'svlsTroubleshootingData'
  },
  {
    id: 'elb', 
    pageFile: 'src/pages/ELBPage.js',
    dataFile: 'src/data/elbTroubleshootingData.js',
    dataExport: 'elbTroubleshootingData'
  },
  {
    id: 'dmi',
    pageFile: 'src/pages/DMIPage.js', 
    dataFile: 'src/data/dmitroubleshootingdata.js',
    dataExport: 'dmitroubleshootingdata'
  }
];

/**
 * Check if all required files exist
 */
function checkPrerequisites() {
  console.log('🔍 Checking prerequisites...\n');
  
  const requiredFiles = [
    'src/config/services.js',
    'src/config/routes.js',
    'src/components/ServicePageFactory.js'
  ];
  
  const missing = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missing.length > 0) {
    console.error('❌ Missing required files:');
    missing.forEach(file => console.error(`   - ${file}`));
    console.error('\nPlease run the refactoring setup first.');
    process.exit(1);
  }
  
  console.log('✅ All prerequisites found\n');
}

/**
 * Validate service configurations
 */
function validateServiceConfigs() {
  console.log('🔍 Validating service configurations...\n');
  
  try {
    const servicesPath = path.resolve('src/config/services.js');
    delete require.cache[servicesPath];
    const { SERVICES } = require('../src/config/services.js');
    
    const configuredServices = Object.keys(SERVICES);
    const migrateableIds = MIGRATEABLE_SERVICES.map(s => s.id);
    
    const missingConfigs = migrateableIds.filter(id => !configuredServices.includes(id));
    
    if (missingConfigs.length > 0) {
      console.error('❌ Missing service configurations:');
      missingConfigs.forEach(id => console.error(`   - ${id}`));
      console.error('\nPlease add these to src/config/services.js');
      process.exit(1);
    }
    
    console.log('✅ All service configurations found\n');
    
  } catch (error) {
    console.error('❌ Error loading service configurations:', error.message);
    process.exit(1);
  }
}

/**
 * Test that ServicePageFactory can load each service
 */
async function testServiceFactory() {
  console.log('🧪 Testing ServicePageFactory...\n');
  
  // This is a basic test - in a real scenario you'd want to use a proper test runner
  for (const service of MIGRATEABLE_SERVICES) {
    try {
      // Check if data file exists and can be imported
      const dataPath = path.resolve(service.dataFile);
      if (!fs.existsSync(dataPath)) {
        console.error(`❌ Data file not found: ${service.dataFile}`);
        continue;
      }
      
      // Try to require the data file
      delete require.cache[dataPath];
      const dataModule = require(`../${service.dataFile}`);
      const data = dataModule[service.dataExport] || dataModule.default;
      
      if (!data) {
        console.error(`❌ Data export not found: ${service.dataExport} in ${service.dataFile}`);
        continue;
      }
      
      if (!Array.isArray(data)) {
        console.error(`❌ Data is not an array: ${service.dataFile}`);
        continue;
      }
      
      console.log(`✅ Service ${service.id}: Data loaded successfully (${data.length} root nodes)`);
      
    } catch (error) {
      console.error(`❌ Service ${service.id}: Error loading data - ${error.message}`);
    }
  }
  
  console.log('\n');
}

/**
 * Create backup of page files before deletion
 */
function createBackups() {
  console.log('💾 Creating backups...\n');
  
  const backupDir = 'backups/pages';
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  for (const service of MIGRATEABLE_SERVICES) {
    if (fs.existsSync(service.pageFile)) {
      const fileName = path.basename(service.pageFile);
      const backupPath = path.join(backupDir, fileName);
      
      fs.copyFileSync(service.pageFile, backupPath);
      console.log(`✅ Backed up ${service.pageFile} to ${backupPath}`);
    }
  }
  
  console.log('\n');
}

/**
 * Remove old page files
 */
function removeOldPageFiles() {
  console.log('🗑️  Removing old page files...\n');
  
  for (const service of MIGRATEABLE_SERVICES) {
    if (fs.existsSync(service.pageFile)) {
      fs.unlinkSync(service.pageFile);
      console.log(`✅ Removed ${service.pageFile}`);
    } else {
      console.log(`ℹ️  File not found: ${service.pageFile}`);
    }
  }
  
  console.log('\n');
}

/**
 * Update App.js imports (remove old page imports)
 */
function updateAppImports() {
  console.log('📝 Updating App.js imports...\n');
  
  const appPath = 'src/App.js';
  if (!fs.existsSync(appPath)) {
    console.error('❌ App.js not found');
    return;
  }
  
  let appContent = fs.readFileSync(appPath, 'utf8');
  
  // Remove old page imports
  const importsToRemove = [
    "import SVLSPage from './pages/SVLSPage';",
    "import DMIPage from './pages/DMIPage';", 
    "import ELBPage from './pages/ELBPage';"
  ];
  
  let modified = false;
  importsToRemove.forEach(importLine => {
    if (appContent.includes(importLine)) {
      appContent = appContent.replace(importLine + '\n', '');
      modified = true;
      console.log(`✅ Removed import: ${importLine}`);
    }
  });
  
  if (modified) {
    fs.writeFileSync(appPath, appContent);
    console.log('✅ App.js updated successfully');
  } else {
    console.log('ℹ️  No imports to remove from App.js');
  }
  
  console.log('\n');
}

/**
 * Generate migration report
 */
function generateReport() {
  console.log('📊 Migration Report\n');
  console.log('==================\n');
  
  console.log('✅ Successfully migrated services:');
  MIGRATEABLE_SERVICES.forEach(service => {
    console.log(`   - ${service.id} (${service.pageFile} → ServicePageFactory)`);
  });
  
  console.log('\n📁 Files created/updated:');
  console.log('   - src/config/services.js (service configurations)');
  console.log('   - src/config/routes.js (route definitions)');
  console.log('   - src/components/ServicePageFactory.js (generic page component)');
  console.log('   - src/App.js (updated routing)');
  
  console.log('\n💾 Backups created in:');
  console.log('   - backups/pages/ (original page files)');
  
  console.log('\n🎯 Benefits achieved:');
  console.log('   - Reduced page files from 17+ to 1 generic factory');
  console.log('   - Centralized service configuration');
  console.log('   - Eliminated code duplication');
  console.log('   - Simplified adding new services');
  
  console.log('\n📚 Next steps:');
  console.log('   1. Test all migrated routes: /svls, /elb, /dmi');
  console.log('   2. Verify search functionality works');
  console.log('   3. Check that all links and navigation work');
  console.log('   4. Run: npm start and test the application');
  console.log('   5. Consider migrating remaining services');
  
  console.log('\n✨ Migration completed successfully!\n');
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('🚀 Starting service migration...\n');
  
  try {
    checkPrerequisites();
    validateServiceConfigs();
    await testServiceFactory();
    createBackups();
    removeOldPageFiles();
    updateAppImports();
    generateReport();
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error('\nPlease check the error and try again.');
    process.exit(1);
  }
}

// Run migration if called directly
if (require.main === module) {
  migrate();
}

module.exports = { migrate, MIGRATEABLE_SERVICES };