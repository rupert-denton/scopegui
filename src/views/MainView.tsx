import FileSelector from "../components/FileSelector";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
export default function MainView() {
  const { scopeAndSequence } = useScopeAndSequence();

  if (!scopeAndSequence)
    return (
      <>
        <p>No scope and sequence loaded.</p>
        <FileSelector />
      </>
    );
}
