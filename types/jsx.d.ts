declare namespace JSX {
  interface Element {}
  interface ElementClass { render?: any }
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
