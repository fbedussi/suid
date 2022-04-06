import { Identifier, SourceFile, ts } from "ts-morph";

export default function findReactObjects(source: SourceFile) {
  const reactImport = source.getImportDeclaration("react");
  const result: { name: string; node: Identifier }[] = [];
  if (reactImport) {
    const ns = reactImport.getNamespaceImport();
    if (ns)
      for (const ref of ns.findReferencesAsNodes()) {
        if (ref.getFirstAncestorByKind(ts.SyntaxKind.NamespaceImport)) continue;
        const propertyAccess = ref.getFirstAncestorByKind(
          ts.SyntaxKind.PropertyAccessExpression
        );
        const lastIdentifier = propertyAccess?.getLastChildByKind(
          ts.SyntaxKind.Identifier
        );

        if (lastIdentifier) {
          result.push({ name: lastIdentifier.getText(), node: lastIdentifier });
        }
      }
  }
  return result;
}
