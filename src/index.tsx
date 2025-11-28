// https://github.com/oven-sh/bun/issues/25162

import { render } from "@opentui/solid";
import { createSignal, createEffect, onCleanup, For } from "solid-js";
import { watch } from "fs";
import { join } from "path";
import { TextAttributes } from "@opentui/core";

interface LogEntry {
  id: number;
  type: string;
  message: string;
}

const SCRIPT_PATH = join(import.meta.dir, "script.ts");

function App() {
  const [executorWorker, setExecutorWorker] = createSignal<Worker | null>(null);
  const [workerCount, setWorkerCount] = createSignal(0);
  const [logs, setLogs] = createSignal<LogEntry[]>([]);

  let logId = 0;

  const addLog = (type: string, message: string) => {
    setLogs((prev) => [...prev.slice(-50), { id: logId++, type, message }]);
  };

  const spawnWorker = () => {
    const oldWorker = executorWorker();
    if (oldWorker) {
      oldWorker.terminate();
      addLog("terminate", "Worker terminated");
    }

    const w = new Worker(new URL("./executor.worker.ts", import.meta.url).href);

    w.onmessage = (e) => {
      addLog(e.data.type, e.data.message ?? JSON.stringify(e.data.value ?? ""));
    };

    w.onerror = (e) => addLog("error", e.message);

    setExecutorWorker(w);
    setWorkerCount((c) => c + 1);
    addLog("spawn", `Worker #${workerCount() + 1} created`);

    w.postMessage({ file: SCRIPT_PATH });
  };

  createEffect(() => {
    addLog("info", `Watching: ${SCRIPT_PATH}`);

    const watcher = watch(SCRIPT_PATH, { persistent: true }, (eventType) => {
      if (eventType === "change") {
        addLog("watch", "File changed - respawning worker...");
        spawnWorker();
      }
    });

    spawnWorker();

    onCleanup(() => {
      watcher.close();
      executorWorker()?.terminate();
    });
  });

  return (
    <box flexDirection="column" flexGrow={1} padding={1}>
      <text attributes={TextAttributes.BOLD}>FFI Crash Repro - Bun Issue #25162</text>
      <text>Workers: {workerCount()} | Logs: {logs().length}</text>
      <text>Touch script.ts to trigger terminate/create cycles</text>

      <scrollbox flexGrow={1} viewportCulling focused={false}>
        <For each={logs()}>
          {(entry) => (
            <text>
              [{entry.type}] {entry.message}
            </text>
          )}
        </For>
      </scrollbox>
    </box>
  );
}

render(() => <App />);
