// we need to declare the model-viewer element as a react component

export declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.AllHTMLAttributes<Partial<globalThis.HTMLElementTagNameMap['model-viewer']>>,
        Partial<globalThis.HTMLElementTagNameMap['model-viewer']>
      >
    }
  }
}
