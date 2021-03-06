"use strict";

/*
    This whole module is dedicated to adding
    one line of coverage for markdown.js.

    There may be a better way.
*/

const {set_global, with_field, zrequire} = require("../zjsunit/namespace");
const {run_test} = require("../zjsunit/test");

set_global("page_params", {});

const markdown_config = zrequire("markdown_config");

const markdown = zrequire("markdown");

markdown.initialize([], markdown_config.get_helpers());

run_test("katex_throws_unexpected_exceptions", () => {
    blueslip.expect("error", "Error: some-exception");
    const message = {raw_content: "$$a$$"};
    with_field(
        markdown,
        "katex",
        {
            renderToString: () => {
                throw new Error("some-exception");
            },
        },
        () => {
            markdown.apply_markdown(message);
        },
    );
});
