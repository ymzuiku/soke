import { soke } from "../lib/index";

describe("check soke", () => {
  test("check fn error", async () => {
    const schema = soke.object({
      name: soke.string().min(2, "to min").max(10, "to max"),
      email: soke.string().email("need a email"),
      phone: soke
        .string()
        .required("need input phone")
        .chinaPhone("phone formart error"),
      code: soke.string("need input code").required().matches(/^\d+$/).len(6),
      agree: soke.bool().required("need click agree"),
      password: soke
        .string()
        .required("need input password")
        .passwordStrong("password is too weak"),
      passwordAgain: soke
        .string("password again need equal to password")
        .required()
        .equalByKey("password"),
    });
    const errors = schema.validate({
      name: "a",
      phone: "133",
      code: "11",
      password: "123",
      passwordAgain: "456",
    });

    expect(errors.errors).toEqual({
      name: "to min",
      email: "need a email",
      phone: "phone formart error",
      code: "need input code",
      agree: "need click agree",
      password: "password is too weak",
      passwordAgain: "password again need equal to password",
    });
    expect(errors.error).toEqual("to min");
  });
  test("check in key", async () => {
    const schema = soke.object({
      phone: soke
        .string()
        .required("need input phone")
        .chinaPhone("phone formart error"),
      code: soke.string("need input code").required().number().len(6),
      agree: soke.bool().required("need click agree"),
      password: soke
        .string()
        .required("need input password")
        .passwordStrong("password is too weak"),
      passwordAgain: soke
        .string("password again need equal to password")
        .required()
        .equalByKey("password"),
    });
    const errors = schema.validate(
      {
        phone: "133",
        code: "11",
        password: "123",
        passwordAgain: "456",
      },
      {
        key: "password",
      }
    );
    expect(errors.errors).toEqual({
      password: "password is too weak",
    });

    try {
      schema.isValid(
        {
          phone: "133",
          code: "11",
          password: "123",
          passwordAgain: "456",
        },
        "password"
      );
    } catch (err) {
      expect(err).toEqual(Error("password is too weak"));
    }
  });
  test("check array", async () => {
    const schema = soke.object({
      anime: soke
        .array("type need a array")
        .required("need input phone")
        .min(2, "to min")
        .pick(["dog", "fish", "cat"], "pick warn"),
    });
    {
      const errors = schema.validate({
        anime: "dog",
      });
      expect(errors.errors).toEqual({
        anime: "type need a array",
      });
    }
    {
      const errors = schema.validate({
        anime: ["cat"],
      });
      expect(errors.errors).toEqual({
        anime: "to min",
      });
    }
    {
      const errors = schema.validate({
        anime: ["cat", "fish2"],
      });
      expect(errors.errors).toEqual({
        anime: "pick warn",
      });
    }
    {
      const errors = schema.validate({
        anime: ["cat", "fish"],
      });
      expect(errors.errors).toEqual({
        anime: "",
      });
      // throw "aa";
    }
  });
  test("check fn dto", async () => {
    const schema = soke.object({
      name: soke.string().min(2, "to min").max(10, "to max"),
      email: soke.string().email("need a email"),
      phone: soke
        .string()
        .required("need input phone")
        .chinaPhone("phone formart error"),
      code: soke.string("need input code").required().matches(/^\d+$/).len(6),
      agree: soke.bool().required("need click agree"),
      password: soke
        .string()
        .required("need input password")
        .passwordStrong("password is too weak"),
      passwordAgain: soke
        .string("password again need equal to password")
        .required()
        .equalByKey("password"),
    });

    try {
      const errors = schema.dto({
        name: "a",
        phone: "133",
        code: "11",
        password: "123",
        passwordAgain: "456",
      });
    } catch (err) {
      expect(err).toEqual(new Error("to min"));
    }

    const value = {
      name: "aaa",
      phone: "13333333333",
      email: "mail@qqq.com",
      code: "666666",
      password: "123123Qwe",
      passwordAgain: "123123Qwe",
      agree: true,
      cat: "123123Qwe",
    };
    let v2 = schema.dto(value);
    expect(v2).toEqual({
      name: "aaa",
      phone: "13333333333",
      email: "mail@qqq.com",
      code: "666666",
      password: "123123Qwe",
      passwordAgain: "123123Qwe",
      agree: true,
    });
  });

  test("check min max", async () => {
    const schema = soke.object({
      name: soke.string().min(2, "to min").max(4, "to max"),
      age: soke.number("need number").min(4, "to min").max(6, "to max"),
    });

    {
      const errors = schema.validate({
        name: "a",
        age: 100,
      });

      expect(errors.errors).toEqual({
        name: "to min",
        age: "to max",
      });
    }
    {
      const errors = schema.validate({
        name: "aa",
        age: 4,
      });

      expect(errors.errors).toEqual({
        name: "",
        age: "",
      });
    }
    {
      const errors = schema.validate({
        name: "aaaa",
        age: 6,
      });

      expect(errors.errors).toEqual({
        name: "",
        age: "",
      });
    }
    {
      const errors = schema.validate({
        name: "aaaaa",
        age: 7,
      });

      expect(errors.errors).toEqual({
        name: "to max",
        age: "to max",
      });
    }
  });
  test("check number", async () => {
    const schema = soke.object({
      age: soke
        .number("need number")
        .required("need input age")
        .min(4, "to min")
        .max(60, "to max"),
    });

    {
      const errors = schema.validate({
        age: "20",
      });

      expect(errors.errors).toEqual({
        age: "need number",
      });
    }
    {
      const errors = schema.validate({
        age: 0,
      });

      expect(errors.errors).toEqual({
        age: "to min",
      });
    }
  });
  test("soke object", async () => {
    const schema = soke.object({
      obj: soke.object({
        name: soke.string().min(2, "to min").max(4, "to max"),
        age: soke.number("need number").min(4, "to min").max(6, "to max"),
      }),
    });

    {
      const errors = schema.validate({
        obj: "20",
      });

      expect(errors.errors).toEqual({
        obj: "Need a object",
      });
    }
    {
      const errors = schema.validate({
        obj: {
          name: "200",
        },
      });

      expect(errors.errors).toEqual({
        obj: "to min",
      });
    }
    {
      const errors = schema.validate({
        obj: {
          name: "200",
          age: 5,
        },
      });

      expect(errors.errors).toEqual({
        obj: "",
      });
    }
    {
      try {
        const val = schema.dto({
          obj: {
            name: "200",
            age: "5",
          },
        });
        expect(val).toEqual({
          obj: {
            age: 5,
            name: "200",
          },
        });
      } catch (err) {
        expect(err).toEqual(undefined);
      }
    }

    {
      const val = schema.dto({
        obj: {
          name: "200",
          age: 5,
          fish: "the fish",
        },
      });
      expect(val).toEqual({
        obj: {
          age: 5,
          name: "200",
        },
      });
    }
  });
});
