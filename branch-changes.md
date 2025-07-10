# Branch Changes Analysis

This document tracks changes in each branch compared to upstream/main.

## Branches

### security/dockerfile-enhancements-signed

**Files Modified**:
- .dockerignore (new)
- .github/workflows/security-scan.yml (new)
- .trivyignore (new)
- Dockerfile
- README.md
- docs/security.md (new)
- health.js (new)

**Nature of Changes**:
- Enhanced Docker container security features
- Added container health checks
- Implemented security scanning workflow
- Added security documentation
- Improved Docker build process with security best practices
- Added maintainer labels and metadata to Dockerfile

**Changes Type**: Functional (Security Enhancements)

**Attribution Requirements**:
- Original project attribution maintained
- Additional maintainer info added (tz-dev@vectorweight.com)

### update-licensing

**Files Modified**:
- .dockerignore (new)
- .github/workflows/security-scan.yml (new)
- .trivyignore (new)
- Dockerfile
- NOTICE (new)
- README.md
- docs/security.md (new)
- health.js (new)
- src/server.ts
- src/tools/BaseTool.ts
- src/utils.ts

**Nature of Changes**:
- Added MIT license headers to source files
- Created NOTICE file for attribution
- Updated README with fork notice
- Changed image badge to point to fork
- Added security documentation
- Enhanced Docker configuration
- Added comprehensive copyright notices

**Changes Type**: Licensing and Attribution

**Attribution Requirements**:
- Original project attribution to Mike Chao (GNU GPL v3.0)
- MIT License headers in new/modified files
- Fork attribution in README
- Explicit attribution in NOTICE file
