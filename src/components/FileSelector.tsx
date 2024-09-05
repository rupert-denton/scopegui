import useScopeAndSequence from "../hooks/useScopeAndSequence";

export default function FileSelector() {
  const { loadScopeAndSequence } = useScopeAndSequence();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      loadScopeAndSequence(file);
    }
  }

  return (
    <div>
      <h2>Load Scope and Sequence</h2>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}
