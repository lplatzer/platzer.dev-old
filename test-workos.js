#!/usr/bin/env node

// Test WorkOS configuration
const fs = require('fs');
const path = require('path');

// Manual .env.local parsing
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let value = match[2].trim();
    // Remove quotes if present
    value = value.replace(/^["']|["']$/g, '');
    process.env[key] = value;
  }
});

console.log('🔍 Testing WorkOS Configuration\n');

const requiredVars = [
  'WORKOS_CLIENT_ID',
  'WORKOS_API_KEY',
  'WORKOS_COOKIE_PASSWORD',
  'WORKOS_REDIRECT_URI',
];

let hasErrors = false;

console.log('Checking environment variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`  ❌ ${varName}: NOT SET`);
    hasErrors = true;
  } else {
    const display = varName.includes('KEY') || varName.includes('PASSWORD') 
      ? `${value.substring(0, 10)}... (length: ${value.length})`
      : value;
    console.log(`  ✅ ${varName}: ${display}`);
  }
});

console.log('\nChecking values:');

// Check CLIENT_ID format
const clientId = process.env.WORKOS_CLIENT_ID;
if (clientId && !clientId.startsWith('client_')) {
  console.log('  ⚠️  CLIENT_ID should start with "client_"');
  hasErrors = true;
}

// Check API_KEY format  
const apiKey = process.env.WORKOS_API_KEY;
if (apiKey && !apiKey.startsWith('sk_')) {
  console.log('  ⚠️  API_KEY should start with "sk_"');
  hasErrors = true;
}

// Check COOKIE_PASSWORD length (should be at least 32 chars)
const cookiePassword = process.env.WORKOS_COOKIE_PASSWORD;
if (cookiePassword && cookiePassword.length < 32) {
  console.log(`  ⚠️  COOKIE_PASSWORD too short (${cookiePassword.length} chars, need 32+)`);
  hasErrors = true;
}

// Check REDIRECT_URI format
const redirectUri = process.env.WORKOS_REDIRECT_URI;
if (redirectUri && !redirectUri.startsWith('http')) {
  console.log('  ⚠️  REDIRECT_URI should be a full URL');
  hasErrors = true;
}

if (!hasErrors) {
  console.log('  ✅ All values look good!');
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ Configuration has errors. Please fix and try again.');
  process.exit(1);
} else {
  console.log('✅ WorkOS configuration looks correct!');
  console.log('\nTo test authentication:');
  console.log('  1. Start dev server: pnpm dev');
  console.log('  2. Visit: http://localhost:3000/etf-test');
  console.log('  3. You should be redirected to WorkOS sign-in');
  process.exit(0);
}
