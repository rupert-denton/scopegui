import FileSelector from "../components/FileSelector";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
export default function MainView() {
  const { scopeAndSequence } = useScopeAndSequence();

  if (!scopeAndSequence) {
    return (
      <>
        <p>No scope and sequence loaded.</p>
        <FileSelector />
      </>
    );
  }

  return (
    <ul>
      {scopeAndSequence.data.map((item) => (
        <li key={item.id}>
          {item.level} - {item.levelInfo}
        </li>
      ))}
    </ul>
  );
}
