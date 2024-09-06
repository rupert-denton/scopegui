import FileSelector from "../components/FileSelector";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
import LevelList from "../components/LevelList";
import ActionGroup from "@/components/ActionGroup";

export default function MainView() {
  const { scopeAndSequence } = useScopeAndSequence();

  return scopeAndSequence ? (
    <>
      <ActionGroup />
      <LevelList />
    </>
  ) : (
    <FileSelector />
  );
}
