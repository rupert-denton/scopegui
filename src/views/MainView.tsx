import FileSelector from "../components/FileSelector";
import VersionSelector from "../components/VersionSelector";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
export default function MainView() {
  const { scopeAndSequence, saveScopeAndSequence, unloadScopeAndSequence } =
    useScopeAndSequence();

  return scopeAndSequence ? (
    <>
      <p>Scope and Sequence loaded</p>
      <VersionSelector />
      <button onClick={saveScopeAndSequence}>Save</button>
      <button onClick={unloadScopeAndSequence}>Unload</button>
    </>
  ) : (
    <>
      <p>No scope and sequence loaded.</p>
      <FileSelector />
    </>
  );
}
