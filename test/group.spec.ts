import soke from "../lib/index";
import errorGet from "error-get";
describe("check group soke", () => {
  test("check password", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          password: [20, 30],
        },
      })({ dog: "500" }, "zh")
    );
    expect(res).toMatch(/格式不正确/);
  });

  test("check password success", async () => {
    const res = await errorGet(() =>
      soke({
        dog2: {
          password: [4, 30],
        },
      })({ dog2: "aAbc123com" })
    );
    expect(res.dog2).toMatch(/aAbc/);
  });

  test("check account success", async () => {
    const res = await errorGet(() =>
      soke({
        hello: {
          account: [4, 30],
        },
      })({ hello: "aAbcaaaaaaaa1" })
    );
    expect(res.hello).toMatch(/aAbc/);
  });

  test("phone error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          cnPhone: 1,
        },
      })({ dog: "53332009999" })
    );
    expect(res).toMatch(/格式不正确/);
  });

  test("phone success", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          cnPhone: 1,
        },
      })({ dog: "13332009999" })
    );
    expect(res.dog).toBe("13332009999");
  });

  test("idcard success", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          cnIdCard: 1,
        },
      })({ dog: "110101199003078777" })
    );
    expect(res.dog).toBe("110101199003078777");
  });

  test("idcard error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          cnIdCard: 1,
        },
      })({ dog: "110101199003078772" })
    );
    expect(res).toMatch(/格式不正确/);
  });
});
