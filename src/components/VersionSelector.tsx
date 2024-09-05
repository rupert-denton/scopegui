import { useEffect, useState } from "react";
import semver from "semver";
import useScopeAndSequence from "../hooks/useScopeAndSequence";

export default function VersionSelector() {
  const { scopeAndSequence, updatedScopeAndSequence, setUpdatedVersion } =
    useScopeAndSequence();
  const version = scopeAndSequence?.version;
  const updatedVersion = updatedScopeAndSequence?.version;
  const [releaseType, setReleaseType] = useState<"major" | "minor" | "patch">(
    "patch"
  );

  useEffect(() => {
    if (version) {
      setUpdatedVersion(semver.inc(version, releaseType));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version, releaseType]);

  if (!version || !updatedVersion) return <p>Version missing</p>;
  return (
    <>
      <p>
        Version: {version?.toString()} {"->"} {updatedVersion?.toString()}
      </p>
      <select
        value={releaseType}
        onChange={(e) => setReleaseType(e.target.value as typeof releaseType)}
      >
        <option value="major">Major</option>
        <option value="minor">Minor</option>
        <option value="patch">Patch</option>
      </select>
    </>
  );
}
