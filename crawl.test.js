const {normalizeURL} = require("./crawl");
const { test, expect } = require("@jest/globals")

test('Normalize URL strip protocol', () => {
    const input = "https://boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "boot.dev/path";

    expect(actual).toEqual(expected);
});

test('Normalize URL strip trailing slashes', () => {
    const input = "https://boot.dev/";
    const actual = normalizeURL(input);
    const expected = "boot.dev";

    expect(actual).toEqual(expected);
});

test('Normalize URL Capitals', () => {
    const input = "https://BOOT.dEv/";
    const actual = normalizeURL(input);
    const expected = "boot.dev";

    expect(actual).toEqual(expected);
});