import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter, slugify } from './string-utils';

describe('string-utils', () => {
  describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalizeFirstLetter('hello')).toBe('Hello');
      expect(capitalizeFirstLetter('WORLD')).toBe('World');
    });

    it('should handle empty strings', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should handle single letter strings', () => {
      expect(capitalizeFirstLetter('a')).toBe('A');
    });
  });

  describe('slugify', () => {
    it('should convert spaces to hyphens', () => {
      expect(slugify('hello world')).toBe('hello-world');
    });

    it('should remove special characters', () => {
      expect(slugify('hello! @world#')).toBe('hello-world');
    });

    it('should convert to lowercase', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle multiple spaces and hyphens', () => {
      expect(slugify('hello   world--')).toBe('hello-world');
    });
  });
});