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
});
