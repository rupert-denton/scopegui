export default function GameData({ value }: { value: any }) {
  return <pre>{JSON.stringify(value, null, 2)}</pre>;
}
