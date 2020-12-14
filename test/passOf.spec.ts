import soke from "../lib/index";
import errorGet from "error-get";

soke.baseLangaue = "zh";

describe("check passOf soke", () => {
  test("check passOf empty", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          passOf: ["fish2"],
        },
        fish: {
          type: "number",
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res.fish).toBe(500);
  });
  test("check passOf", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          passOf: ["fish"],
        },
        fish: {
          type: "number",
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res.fish).toBe(500);
  });

  test("check passOf error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          passOf: ["fish"],
        },
        fish: {
          message: () => "oneOf error",
          type: "boolean",
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res).toMatch(/oneOf/);
  });

  test("check passOf error self", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minLength: 10,
          maxLength: 20,
          message: () => "oneOf error",
          passOf: ["fish"],
        },
        fish: {
          type: "boolean",
        },
      })({ dog: "aaa", fish: 500 }, "zh")
    );
    expect(res).toMatch(/oneOf/);
  });

  test("check passOf of oneOf", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minLength: 10,
          maxLength: 20,
          message: () => "oneOf error",
          passOf: ["fish"],
        },
        fish: {
          type: "number",
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res.dog).toMatch(/aaaaaa/);
  });

  test("check passOf of self", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minLength: 10,
          maxLength: 20,
        },
        fish: {
          type: "boolean",
          message: () => "oneOf error",
          passOf: ["dog"],
        },
      })({ dog: "aaaaaaaaaaaaaaaa", fish: 500 }, "zh")
    );
    expect(res.dog).toMatch(/aaaaaa/);
  });

  test("check passOf of reg", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minLength: 10,
          maxLength: 20,
        },
        fish: {
          type: "boolean",
          message: () => "oneOf error",
          passOf: [/error-fish/, /the/],
        },
      })({ dog: "aaaaaaaaaaaa", fish: "the fish" }, "zh")
    );
    expect(res.dog).toMatch(/aa/);
  });
});
