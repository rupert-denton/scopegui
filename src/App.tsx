import FileSelector from "./components/FileSelector";
import useScopeAndSequence from "./hooks/useScopeAndSequence";

export default function App() {
  const { scopeAndSequence, unloadScopeAndSequence } = useScopeAndSequence();
  return (
    <>
      <h1>Scope And Sequence GUI</h1>
      {scopeAndSequence ? (
        <>
          <div>Scope and Sequence loaded</div>
          <button onClick={unloadScopeAndSequence}>Unload</button>
        </>
      ) : (
        <FileSelector />
      )}
    </>
  );
}
