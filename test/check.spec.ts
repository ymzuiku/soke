import soke from "../lib/index";
import errorGet from "error-get";

soke.baseLangaue = "zh";

describe("check soke", () => {
  test("check fn error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          check: (v: string) => v.length > 5,
        },
      })({ dog: "500" }, "zh")
    );
    expect(res).toMatch(/格式不正确/);
  });
  test("check fn sucess", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          check: (v: string) => v.length > 2,
        },
      })({ dog: "500" }, "zh")
    );
    expect(res.dog).toMatch(/50/);
  });

  test("check fns sucess", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          check: [(v: string) => v.length > 2, /50/],
        },
      })({ dog: "500" }, "zh")
    );
    expect(res.dog).toMatch(/50/);
  });

  test("check fns error", async () => {
    const res = await errorGet(() =>
      soke({
        checkFns: {
          check: [(v: string) => v.length > 2, /20/],
        },
      })({ checkFns: "500" }, "zh")
    );
    expect(res).toMatch(/格式不正确/);
  });
});
