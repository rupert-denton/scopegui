import FileSelector from "../components/FileSelector";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
import LevelList from "../components/LevelList";
export default function MainView() {
  const { scopeAndSequence } = useScopeAndSequence();

  return scopeAndSequence ? <LevelList /> : <FileSelector />;
}
