import React, { Suspense } from "react";

const Recorder = React.lazy(() => import("./Recorder"));

export default function AsyncLoader() {
  const [recorder, setRecorder] = React.useState(() => null);
  const handleClick = React.useCallback(() => {
    setRecorder(<Recorder key={Date.now()} />);
  }, []);

  return (
    <>
      <button type="button" onClick={handleClick}>
        load modules
      </button>
      &nbsp;&nbsp;&nbsp;
      <span id="async_loader_recorder">
        <Suspense fallback={null}>{recorder}</Suspense>
      </span>
    </>
  );
}
