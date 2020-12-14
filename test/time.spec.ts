import soke from "../lib/index";
import errorGet from "error-get";
describe("check time", () => {
  test("time ", async () => {
    const res = await errorGet(() => {
      console.time("use time 500x");
      let a: any;
      for (let i = 0; i < 500; i++) {
        a = soke({
          dog2: {
            minLength: 5,
            maxLength: 60,
            check: (v: string) => v.length > 5,
          },
          dog1: {
            check: (v: string) => v.length > 5,
          },
        })({ dog1: "aaaa500", dog2: "aaaaaaaa" }, "zh");
      }
      console.timeEnd("use time 500x");
      return a;
    });
    expect(res.dog1).toMatch(/aaa/);
  });
});
