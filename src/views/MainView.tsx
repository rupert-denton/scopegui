import FileSelector from "../components/FileSelector";
import useScopeAndSequence from "../hooks/useScopeAndSequence";

export default function MainView() {
  const { scopeAndSequence, saveScopeAndSequence, unloadScopeAndSequence } =
    useScopeAndSequence();

  return scopeAndSequence ? (
    <>
      <p>Scope and Sequence loaded</p>
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
