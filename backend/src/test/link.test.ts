import { Link } from "../public/js/Link/Link";

describe("Link", () => {
  let link: Link;
  beforeEach(() => {
    link = new Link();
  });
  it("should return the link string", () => {
    link.createLink("https://www.facebook.com/victoreleanya");
    expect(link.linkStr).toBe("https://www.facebook.com/victoreleanya");
  });
});
