const {normalizeURL, getURLfromHTML} = require("./crawl");
const { test, expect } = require("@jest/globals")

test('normalizeURL strip protocol', () => {
    const input = "https://boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "boot.dev/path";

    expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slashes', () => {
    const input = "https://boot.dev/";
    const actual = normalizeURL(input);
    const expected = "boot.dev";

    expect(actual).toEqual(expected);
});

test('normalizeURL Capitals', () => {
    const input = "https://BOOT.dEv/";
    const actual = normalizeURL(input);
    const expected = "boot.dev";

    expect(actual).toEqual(expected);
});

test('getURLfromHTML absoluteURLs', () => {
    const html = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path">
                    Blogs @ Boot.dev
                </a>
            </body>
        </html>
    `;
    const baseURL = "https://blog.boot.dev";

    const actual = getURLfromHTML(html, baseURL);
    const expected = ["https://blog.boot.dev/path"];

    expect(actual).toEqual(expected);
});

test('getURLfromHTML relativeURLs', () => {
    const html = `
        <html>
            <body>
                <a href="/path">
                    Blogs @ Boot.dev
                </a>
            </body>
        </html>
    `;
    const baseURL = "https://blog.boot.dev";

    const actual = getURLfromHTML(html, baseURL);
    const expected = ["https://blog.boot.dev/path"];

    expect(actual).toEqual(expected);
});

test('getURLfromHTML MultipleURLs', () => {
    const html = `
        <html>
            <body>
                <a href="/path1">
                    Blogs @ Boot.dev
                </a>
                <div>
                    <h1>Hello there</h1>
                    <p> I am fine!!! </p>
                </div>
                <a href="https://blog.boot.dev/path2">
                    Blogs 2
                </a>
            </body>
        </html>
    `;
    const baseURL = "https://blog.boot.dev";

    const actual = getURLfromHTML(html, baseURL);
    const expected = ["https://blog.boot.dev/path1","https://blog.boot.dev/path2"];

    expect(actual).toEqual(expected);
});

test('getURLfromHTML invalidURLs', () => {
    const html = `
        <html>
            <body>
                <a href="invalid">
                    Blogs @ Boot.dev
                </a>
            </body>
        </html>
    `;
    const baseURL = "https://blog.boot.dev";

    const actual = getURLfromHTML(html, baseURL);
    const expected = [];

    expect(actual).toEqual(expected);
});