"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Link_1 = require("../public/js/Link/Link");
describe("Link", () => {
    let link;
    beforeEach(() => {
        link = new Link_1.Link();
    });
    it("should return the link string", () => {
        link.createLink("https://www.facebook.com/victoreleanya");
        expect(link.linkStr).toBe("https://www.facebook.com/victoreleanya");
    });
});
//# sourceMappingURL=link.test.js.map