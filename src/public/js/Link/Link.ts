class Link {
  public linkStr: string;
  constructor() {
    this.linkStr = "";
  }

  createLink(link: string): void {
    this.linkStr = link;
  }
}

export { Link };
