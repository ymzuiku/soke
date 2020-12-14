import soke from "../lib/index";
import errorGet from "error-get";

soke.baseLangaue = "zh";

describe("check pick", () => {
  test("check pick error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          pick: ["dog", "600", ""],
        },
      })({ dog: "500" }, "zh")
    );
    expect(res).toMatch(/的值不属于/);
  });
  test("check pick error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          pick: ["dog", "600", ""],
          optional: 1,
        },
      })({ dog: "" }, "zh")
    );
    expect(res.dog).toBe("");
  });
  test("check pick sucess", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          pick: ["600", "500"],
        },
      })({ dog: "500" }, "zh")
    );
    expect(res.dog).toMatch(/50/);
  });
});
