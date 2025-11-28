// Disposable worker
declare var self: Worker;

interface ExecuteRequest {
  file: string;
}

self.onmessage = async (event: MessageEvent<ExecuteRequest>) => {
  const { file } = event.data;

  try {
    const mod = await import(`${file}?t=${Date.now()}`);

    if (typeof mod.default === "function") {
      const result = await mod.default();
      postMessage({ type: "result", value: result });
    } else {
      postMessage({
        type: "done",
        message: "Module loaded (no default export)",
      });
    }
  } catch (err) {
    postMessage({
      type: "error",
      message: err instanceof Error ? err.message : String(err),
    });
  }
};

postMessage({ type: "ready" });
