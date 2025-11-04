/**
 * Navigation utilities test suite
 * Tests for navigation structure
 */

import { navigation } from '../nav';

describe('Navigation Module', () => {
  describe('navigation structure', () => {
    it('should have pages property', () => {
      expect(navigation).toHaveProperty('pages');
      expect(Array.isArray(navigation.pages)).toBe(true);
    });

    it('should have coffeeTools property', () => {
      expect(navigation).toHaveProperty('coffeeTools');
      expect(Array.isArray(navigation.coffeeTools)).toBe(true);
    });

    it('should have tools property', () => {
      expect(navigation).toHaveProperty('tools');
      expect(Array.isArray(navigation.tools)).toBe(true);
    });

    it('should have valid page items with required properties', () => {
      navigation.pages.forEach((page) => {
        expect(page).toHaveProperty('name');
        expect(page).toHaveProperty('href');
        expect(page).toHaveProperty('activeSegment');
        expect(typeof page.name).toBe('string');
        expect(typeof page.href).toBe('string');
        expect(typeof page.activeSegment).toBe('string');
      });
    });

    it('should have valid coffee tool items with required properties', () => {
      navigation.coffeeTools.forEach((tool) => {
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('href');
        expect(tool).toHaveProperty('activeSegment');
        expect(tool).toHaveProperty('parentNav');
        expect(tool).toHaveProperty('description');
        expect(typeof tool.name).toBe('string');
        expect(typeof tool.href).toBe('string');
        expect(tool.parentNav).toBe('tools');
      });
    });

    it('should have valid tool items with required properties', () => {
      navigation.tools.forEach((tool) => {
        expect(tool).toHaveProperty('name');
        expect(tool).toHaveProperty('href');
        expect(tool).toHaveProperty('activeSegment');
        expect(tool).toHaveProperty('parentNav');
        expect(tool).toHaveProperty('description');
        expect(typeof tool.name).toBe('string');
        expect(typeof tool.href).toBe('string');
        expect(tool.parentNav).toBe('tools');
      });
    });

    it('should have at least one page item', () => {
      expect(navigation.pages.length).toBeGreaterThan(0);
    });

    it('should have home page as first item', () => {
      expect(navigation.pages[0]).toMatchObject({
        name: 'Home',
        href: '/',
        activeSegment: '/',
      });
    });

    it('should have coffee tools with valid href paths', () => {
      navigation.coffeeTools.forEach((tool) => {
        expect(tool.href).toMatch(/^\/coffee-tools\//);
      });
    });

    it('should have general tools with valid href paths', () => {
      navigation.tools.forEach((tool) => {
        expect(tool.href).toMatch(/^\/tools\//);
      });
    });
  });
});
