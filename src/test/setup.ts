import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { testServer } from "./mocks/setupDevServer";

beforeAll(() => testServer.listen());
afterEach(() => testServer.resetHandlers());
afterAll(() => testServer.close());
