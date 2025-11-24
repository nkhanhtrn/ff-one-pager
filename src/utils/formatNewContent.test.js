import { formatNewContent } from './formatNewContent.js';

describe('formatNewContent', () => {
  it('returns current if nothing new is added', () => {
    expect(formatNewContent('foo', 'foo')).toBe('foo');
  });

  it('formats new valid JSON appended', () => {
    const prev = 'foo\n';
    const current = 'foo\n{"a":1}';
    expect(formatNewContent(prev, current)).toBe('foo\n{\n  "a": 1\n}');
  });

  it('does not format if new content is not valid JSON', () => {
    const prev = 'foo\n';
    const current = 'foo\n{"a":1';
    expect(formatNewContent(prev, current)).toBe(current);
  });

  it('formats new valid JSON inserted in the middle', () => {
    const prev = 'foo\nbar';
    const current = 'foo\n{"a":1}\nbar';
    expect(formatNewContent(prev, current)).toBe('foo\n{\n  "a": 1\n}\nbar');
  });

  it('formats only the new part if prefix is not the same', () => {
    const prev = 'abc123';
    const current = 'abc{"b":2}123';
    expect(formatNewContent(prev, current)).toBe('abc{\n  "b": 2\n}123');
  });

  it('returns current if new content is empty', () => {
    expect(formatNewContent('foo', 'foo')).toBe('foo');
  });

  it('formats only the new JSON, not the whole content', () => {
    const prev = 'start\n';
    const current = 'start\n{"c":3}';
    expect(formatNewContent(prev, current)).toBe('start\n{\n  "c": 3\n}');
  });
});
