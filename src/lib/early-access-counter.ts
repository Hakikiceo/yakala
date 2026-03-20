import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type EarlyAccessCounterState = {
  base: number;
  increments: number;
  updatedAt: string;
};

const storageDir = path.join(process.cwd(), "storage");
const counterFile = path.join(storageDir, "early-access-counter.json");
const defaultBase = 450;

function resolveBaseCount() {
  const parsed = Number.parseInt(process.env.EARLY_ACCESS_BASE ?? "", 10);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return defaultBase;
  }

  return parsed;
}

async function readCounterState(): Promise<EarlyAccessCounterState> {
  const base = resolveBaseCount();

  await mkdir(storageDir, { recursive: true });

  try {
    const raw = await readFile(counterFile, "utf8");
    const parsed = JSON.parse(raw) as Partial<EarlyAccessCounterState>;
    const safeBase = Number.isFinite(parsed.base) ? Number(parsed.base) : base;
    const safeIncrements = Number.isFinite(parsed.increments) ? Number(parsed.increments) : 0;

    return {
      base: Math.max(0, safeBase),
      increments: Math.max(0, safeIncrements),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    const initialState: EarlyAccessCounterState = {
      base,
      increments: 0,
      updatedAt: new Date().toISOString(),
    };

    await writeFile(counterFile, JSON.stringify(initialState, null, 2), "utf8");
    return initialState;
  }
}

async function writeCounterState(state: EarlyAccessCounterState) {
  await writeFile(counterFile, JSON.stringify(state, null, 2), "utf8");
}

export async function getEarlyAccessCount() {
  const state = await readCounterState();
  return state.base + state.increments;
}

export async function incrementEarlyAccessCount() {
  const state = await readCounterState();
  const nextState: EarlyAccessCounterState = {
    ...state,
    increments: state.increments + 1,
    updatedAt: new Date().toISOString(),
  };

  await writeCounterState(nextState);
  return nextState.base + nextState.increments;
}

