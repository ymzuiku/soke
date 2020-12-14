import soke from "../lib/index";
import errorGet from "error-get";
describe("check group soke", () => {
  test("check password", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          message: (k, v, lang) => "aaa" + k + v + lang,
          password: [20, 30],
        },
      })({ dog: "500" }, "zh")
    );
    expect(res).toMatch(/aaadog500zh/);
  });

  test("check oneOf", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          max: 20,
          min: 10,
          oneOf: ["fish"],
        },
        fish: {
          type: "number",
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res.fish).toBe(500);
  });

  test("check oneOf error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          max: 20,
          min: 10,
          oneOf: ["fish"],
        },
        fish: {
          message: () => "oneOf error",
          type: "boolean",
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res).toMatch(/oneOf/);
  });

  test("check oneOf error self", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          min: 10,
          max: 20,
          message: () => "oneOf error",
          oneOf: ["fish"],
        },
        fish: {
          type: "boolean",
        },
      })({ dog: "aaa", fish: 500 }, "zh")
    );
    expect(res).toMatch(/oneOf/);
  });

  test("check oneOf of oneOf", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          min: 10,
          max: 20,
          message: () => "oneOf error",
          oneOf: ["fish"],
        },
        fish: {
          type: "number",
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res.dog).toMatch(/aaaaaa/);
  });

  test("check oneOf of self", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          min: 10,
          max: 20,
        },
        fish: {
          type: "boolean",
          message: () => "oneOf error",
          oneOf: ["dog"],
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res.dog).toMatch(/aaaaaa/);
  });

  test("check oneOf of reg", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          min: 10,
          max: 20,
        },
        fish: {
          type: "boolean",
          message: () => "oneOf error",
          oneOf: [/error-fish/, /the/],
        },
      })({ dog: "aaaaaaaaaaaa", fish: "the fish" }, "zh")
    );
    expect(res.dog).toMatch(/aa/);
  });

  test("check oneOf of fn", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          min: 10,
          max: 20,
        },
        fish: {
          // type: "boolean",
          // message: () => "oneOf error",
          oneOf: [(v: string) => v.length > 30, (v: string) => v.length > 300],
        },
      })({ dog: "aaaaaaaaaaaa", fish: "the fish" }, "zh")
    );
    expect(res).toMatch(/aa/);
  });
});
