import soke from "../lib/index";
import errorGet from "error-get";
describe("check group soke", () => {
  test("check password", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          password: [20, 30],
        },
      })({ dog: 500 }, "zh")
    );
    console.log(res, "------");
    expect(res).toMatch(/的类型应该为/);
  });
});
