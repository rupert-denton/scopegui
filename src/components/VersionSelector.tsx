import { useEffect, useState } from "react";
import semver from "semver";
import useScopeAndSequence from "../hooks/useScopeAndSequence";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import styled from "styled-components";
import { ArrowRight } from "lucide-react";

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
    <VersionSelectorContainer>
      <VersionLabel>
        <span>Version</span>
        <span>
          {version?.toString()} <ArrowRight size={16} />{" "}
          {updatedVersion?.toString()}
        </span>
      </VersionLabel>
      <Select
        value={releaseType}
        onValueChange={(value) => setReleaseType(value as typeof releaseType)}
      >
        <SelectTrigger>
          <SelectValue placeholder={releaseType} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="major">Major</SelectItem>
          <SelectItem value="minor">Minor</SelectItem>
          <SelectItem value="patch">Patch</SelectItem>
        </SelectContent>
      </Select>
    </VersionSelectorContainer>
  );
}

const VersionSelectorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const VersionLabel = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  gap: 0.5rem;

  span:first-child {
    font-weight: 500;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
`;
