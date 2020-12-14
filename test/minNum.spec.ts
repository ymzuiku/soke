import soke from "../lib/index";
import errorGet from "error-get";

soke.baseLangaue = "zh";

describe("check checkOf soke", () => {
  test("check minNum sucess", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minNum: 10,
          maxNum: 2000,
        },
      })({ dog: 50, fish: "the fish" }, "zh")
    );

    expect(res.dog).toBe(50);
  });

  test("check minNum error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minNum: 100,
          maxNum: 2000,
        },
      })({ dog: 50, fish: "the fish" }, "zh")
    );

    expect(res).toMatch(/应不小于/);
  });
});
