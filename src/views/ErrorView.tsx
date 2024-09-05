import { useRouteError } from "react-router-dom";

export default function PageNotFoundView() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error = useRouteError() as any;
  console.error(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>{error.statusText || error.message}</p>
    </>
  );
}
