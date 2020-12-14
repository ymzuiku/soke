import soke from "../lib/index";
import errorGet from "error-get";

soke.baseLangaue = "zh";

describe("check checkOf soke", () => {
  test("check checkOf of fn error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minLength: 10,
          maxLength: 20,
        },
        fish: {
          checkOf: [
            (v: string) => v.length > 30,
            (v: string) => v.length > 300,
          ],
        },
      })({ dog: "aaaaaaaaaa", fish: "the fish" }, "zh")
    );

    expect(res).toMatch(/格式不正确/);
  });

  test("check checkOf of success", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          minLength: 10,
          maxLength: 20,
        },
        fish: {
          checkOf: [(v: string) => v.length > 2, (v: string) => v.length > 300],
        },
      })({ dog: "aaaaaaaaaaaa", fish: "the fish" }, "zh")
    );

    expect(res.fish).toMatch(/the/);
  });
});
