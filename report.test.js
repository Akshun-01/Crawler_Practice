const {sortPages} = require("./report");
const { test, expect } = require("@jest/globals")

test('sortPages', () => {
    const input = {
        "https://www.wagslane.dev" : 3,
        "https://www.wagslane.dev/path" : 5,
    }
    const actual = sortPages(input);
    const expected = [
        ["https://www.wagslane.dev/path", 5],
        ["https://www.wagslane.dev", 3],
    ]

    expect(actual).toEqual(expected);
});

test('sortPages', () => {
    const input = {
        "https://www.wagslane.dev" : 3,
        "https://www.wagslane.dev/path" : 5,
        "https://www.wagslane.dev/path2" : 1,
        "https://www.wagslane.dev/path3" : 7,
        "https://www.wagslane.dev/path4" : 9,
    }
    const actual = sortPages(input);
    const expected = [
        ["https://www.wagslane.dev/path4", 9],
        ["https://www.wagslane.dev/path3", 7],
        ["https://www.wagslane.dev/path", 5],
        ["https://www.wagslane.dev", 3],
        ["https://www.wagslane.dev/path2", 1],
    ]

    expect(actual).toEqual(expected);
});