# Technical Documentation

**Version**: 1.0.0  
**Status**: 🔒 Protected (Authentication Required)  
**Last Updated**: 2025-11-04

---

## Overview

This directory contains comprehensive technical documentation for platzer.dev, protected by password authentication. Only authorized developers and technical staff can access this content.

---

## Access

### Web Interface

Visit: `http://localhost:3000/docs/tech` (or your production URL)

You will be redirected to the login page if not authenticated.

### Login

**URL**: `/login`  
**Password**: Set via `TECH_DOCS_PASSWORD` environment variable  
**Default** (development): `changeme`  
**Session Duration**: 7 days

---

## Documentation Sections

### 1. Instruction Management System
**Path**: `/docs/tech/instruction-system`

Complete guide to the instruction versioning and tracking system:
- System overview and purpose
- Architecture and components
- Data models and TypeScript types
- API endpoints with examples
- UI features and workflows
- Usage patterns and best practices

### 2. System Architecture
**Path**: `/docs/tech/architecture`

High-level architecture and design:
- Technology stack (Next.js, React, TypeScript, Tailwind)
- Project structure and file organization
- Architecture patterns (API, Component, Data Storage)
- Architecture Decision Records (ADRs)
- Scalability considerations

### 3. API Reference
**Path**: `/docs/tech/api-reference`

Complete API documentation:
- Instructions API (6 endpoints)
- Wishlist API (4 endpoints)
- Authentication API (3 endpoints)
- Standard response formats
- cURL examples for all endpoints
- Error handling patterns

### 4. Data Storage & Models
**Path**: `/docs/tech/data-storage`

Data layer documentation:
- Current storage solutions (JSON files)
- Data models and structures
- Capacity limits and recommendations
- Migration path to PostgreSQL
- Schema design for database

### 5. Development Guide
**Path**: `/docs/tech/development-guide`

Developer onboarding and standards:
- Quick setup instructions
- Code conventions and style guide
- Testing checklist
- Deployment procedures
- Best practices

### 6. Implementation Summary
**Path**: `/docs/tech/implementation-summary`

Overview of what was built:
- Complete list of components
- Key features and capabilities
- Build status and metrics
- Success indicators
- File inventory

---

## Quick Start

1. **Set Password** (if not already set):
   ```bash
   # Add to .env.local
   TECH_DOCS_PASSWORD=your_secure_password_here
   ```

2. **Start Development Server**:
   ```bash
   pnpm dev
   ```

3. **Access Documentation**:
   - Open browser to `http://localhost:3000/docs/tech`
   - Login with password
   - Browse documentation sections

4. **Logout**:
   - Click "Logout" button on any documentation page
   - Session is cleared immediately

---

## Authentication

### How It Works

1. User visits `/docs/tech` or any protected page
2. ProtectedRoute component checks authentication status
3. If not authenticated, redirect to `/login` with return URL
4. User enters password
5. API validates password and creates secure cookie session
6. User redirected back to originally requested page
7. Session remains valid for 7 days

### Security Features

- **HttpOnly Cookies**: Cannot be accessed by JavaScript
- **SameSite Protection**: Prevents CSRF attacks
- **Secure Flag**: HTTPS-only in production
- **7-Day Expiration**: Automatic session timeout
- **Environment Variable**: Password never in code

### Production Setup

```bash
# Set strong password
TECH_DOCS_PASSWORD=$(openssl rand -base64 32)

# Add to production environment
export TECH_DOCS_PASSWORD="your_generated_password"

# Ensure production mode for secure cookies
export NODE_ENV=production
```

---

## File Structure

```
docs/tech/
├── README.md                    # This file
└── (All other files are React components in src/app/docs/tech/)

src/app/docs/tech/
├── page.tsx                     # Main documentation index
├── instruction-system/
│   └── page.tsx
├── architecture/
│   └── page.tsx
├── api-reference/
│   └── page.tsx
├── data-storage/
│   └── page.tsx
├── development-guide/
│   └── page.tsx
└── implementation-summary/
    └── page.tsx
```

---

## Adding New Documentation

### Create New Section

1. **Create Directory**:
   ```bash
   mkdir -p src/app/docs/tech/new-section
   ```

2. **Create Page**:
   ```typescript
   // src/app/docs/tech/new-section/page.tsx
   'use client';

   import ProtectedRoute from '@/components/ProtectedRoute';
   import Link from 'next/link';

   export default function NewSectionPage() {
     return (
       <ProtectedRoute>
         <div className="min-h-screen bg-gray-50">
           {/* Your content here */}
         </div>
       </ProtectedRoute>
     );
   }
   ```

3. **Update Main Index**:
   - Add link card in `src/app/docs/tech/page.tsx`
   - Follow existing pattern for consistency

4. **Test**:
   ```bash
   pnpm dev
   # Visit http://localhost:3000/docs/tech/new-section
   ```

---

## Styling Guidelines

All documentation pages follow consistent styling:

### Colors
- **Primary**: Blue (`blue-600`, `blue-800`)
- **Success**: Green (`green-600`, `green-800`)
- **Warning**: Yellow (`yellow-600`, `yellow-800`)
- **Error**: Red (`red-600`, `red-800`)
- **Background**: Gray-50 (`gray-50`)
- **Cards**: White with shadow

### Components
- **Headers**: `text-3xl font-bold text-gray-900`
- **Subheaders**: `text-2xl font-bold text-gray-900`
- **Body**: `text-gray-700` or `text-gray-600`
- **Code Blocks**: `bg-gray-900 text-gray-100 font-mono`
- **Sections**: White cards with rounded corners and shadow

### Layout
- **Max Width**: `max-w-5xl mx-auto`
- **Padding**: `px-6 py-8`
- **Spacing**: `space-y-8` between sections

---

## Troubleshooting

### Can't Access Documentation

**Problem**: Redirect loop or access denied

**Solutions**:
1. Check `TECH_DOCS_PASSWORD` is set in `.env.local`
2. Clear browser cookies
3. Try incognito/private browsing mode
4. Check browser console for errors

### Login Not Working

**Problem**: Password accepted but still redirected

**Solutions**:
1. Verify cookies are enabled in browser
2. Check that httpOnly cookies are allowed
3. Clear all site data and try again
4. Check server logs for errors

### Pages Not Loading

**Problem**: 404 or blank pages

**Solutions**:
1. Verify file exists in correct location
2. Check that ProtectedRoute is used correctly
3. Restart development server
4. Clear Next.js cache: `rm -rf .next`

---

## Maintenance

### Regular Updates

1. **Review quarterly**: Check all documentation is up-to-date
2. **Version changes**: Update version number when significant changes made
3. **Test regularly**: Verify all links and examples work
4. **Archive old**: Keep historical versions for reference

### Password Rotation

**Development**:
- Can use simple password like "changeme"
- Update when sharing with new team members

**Production**:
- Rotate every 90 days
- Use strong, randomly generated passwords
- Notify all users before rotation
- Plan rotation during low-traffic periods

---

## Migration to OAuth (Future)

When ready to upgrade from password to OAuth (e.g., WorkOS):

### What Changes
- `src/lib/auth.ts` - Replace with OAuth library
- `src/app/login/page.tsx` - Update to OAuth flow
- `src/app/api/auth/*` - Update endpoints for OAuth

### What Stays Same
- `src/components/ProtectedRoute.tsx` - Same interface
- All documentation pages - No changes needed
- User experience - Similar flow, better security

### Steps
1. Set up OAuth provider (WorkOS, Auth0, etc.)
2. Update authentication library
3. Modify login flow
4. Test thoroughly
5. Deploy with zero downtime

---

## Support

### For Users
- **Forgot Password**: Contact administrator
- **Access Issues**: Check browser compatibility
- **Content Questions**: Refer to specific section

### For Developers
- **Technical Issues**: Check troubleshooting section
- **Feature Requests**: Create GitHub issue
- **Bugs**: Report with reproduction steps

### For Administrators
- **Password Reset**: Update environment variable
- **User Management**: (Future: OAuth with roles)
- **Monitoring**: Check server logs for login attempts

---

## Related Documentation

### Markdown Files (Root Directory)
- `INSTRUCTIONS_SYNTHESIS.md` - Complete synthesis of all branches
- `INSTRUCTION_SYSTEM_README.md` - System guide and API reference
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
- `QUICK_REFERENCE.md` - Quick reference card
- `TECHNICAL_DOCUMENTATION_SUMMARY.md` - Overall summary

### Live Dashboards
- `/admin/instructions` - Instruction management dashboard
- `/docs/tech` - This technical documentation (protected)

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-11-04 | Initial release with 6 sections | Claude AI |

---

## License

This documentation is part of the platzer.dev project.
See main project LICENSE file for details.

---

**Protected Content** - Authentication Required  
**Last Updated**: November 4, 2025  
**Maintained By**: Development Team
