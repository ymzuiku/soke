import soke from "../lib/index";
import errorGet from "error-get";

soke.baseLangaue = "zh";

describe("check single soke", () => {
  test("check min need a object", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          oneOf: ["fish"],
        },
      })(null, "zh")
    );
    expect(res).toMatch(/参数对象不能为空/);
  });
  test("check min need string", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          passOf: ["fish"],
        },
      })({ dog: 500 }, "zh")
    );
    expect(res).toMatch(/的类型应该为/);
  });

  test("check min", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          passOf: ["fish"],
        },
      })({ dog: "do" })
    );
    expect(res).toMatch(/长度应不小于/);
  });

  test("check max", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          passOf: ["fish"],
        },
      })({ dog: "20aaaaaaaaaaaaaaaaaaaaaaa" })
    );
    expect(res).toMatch(/长度应不大于/);
  });

  test("check optional", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          optional: 1,
        },
      })({ cat: "20aaaaaaaaaaaa" })
    );
    expect(res.cat).toMatch(/20aaa/);
  });

  test("check required", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          type: "boolean",
        },
      })({ cat: "20aaaaaaaaaaaa" })
    );
    expect(res).toMatch(/缺少必要参数/);
  });

  test("check pass", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          maxLength: 20,
          minLength: 10,
          type: "boolean",
          pass: 1,
        },
      })({ fish: "20aaaaaaaaaaaa" })
    );
    expect(typeof res).toBe("object");
  });

  test("check type error", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          type: "boolean",
        },
      })({ dog: "20aaaaaaaaaaaa" })
    );
    expect(res).toMatch(/的类型应该为/);
  });

  test("check type success", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          type: "boolean",
        },
      })({ dog: true })
    );
    expect(res.dog).toBe(true);
  });

  test("number type success", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          type: "number",
        },
      })({ dog: 100 })
    );
    expect(res.dog).toBe(100);
  });

  test("string type success", async () => {
    const res = await errorGet(() =>
      soke({
        dog: {
          type: "string",
        },
      })({ dog: "100" })
    );
    expect(res.dog).toBe("100");
  });
});
