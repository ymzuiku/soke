import soke from "../lib/index";
import errorGet from "error-get";

soke.baseLangaue = "zh";

describe("check types", () => {
  test("types array success", async () => {
    const res = await errorGet(() => {
      return soke({
        dog: {
          type: "string",
        },
        dogs: {
          type: "stringArray",
        },
      })({ dog: "aaaa500", dogs: ["aaaaaaaa"] });
    });
    expect(res.dog).toMatch(/aaa/);
  });

  test("types empty array success", async () => {
    const res = await errorGet(() => {
      return soke({
        dog: {
          type: "string",
        },
        dogs: {
          type: "stringArray",
        },
      })({ dog: "aaaa500", dogs: [] });
    });
    expect(res.dog).toMatch(/aaa/);
  });

  test("types array error", async () => {
    const res = await errorGet(() => {
      return soke({
        dog: {
          type: "string",
        },
        dogs: {
          type: "stringArray",
        },
      })({ dog: "aaaa500", dogs: [20] });
    });
    expect(res).toMatch(/的类型应该为/);
  });
});
