class Link {
  public linkStr: string;
  constructor() {
    this.linkStr = "";
  }

  createLink(link: string): void {
    this.linkStr = link;
    console.log(this.linkStr);
  }
}

export { Link };
