import { firstError, soke, throwFirstError, validateSoke } from "../lib/index";

describe("check soke", () => {
  test("check fn error", async () => {
    const schema = {
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
    };
    const errors = validateSoke(schema, {
      name: "a",
      phone: "133",
      code: "11",
      password: "123",
      passwordAgain: "456",
    });

    expect(errors).toEqual({
      name: "to min",
      email: "need a email",
      phone: "phone formart error",
      code: "need input code",
      agree: "need click agree",
      password: "password is too weak",
      passwordAgain: "password again need equal to password",
    });
    const err = firstError(schema, errors);
    expect(err).toEqual("to min");
  });
  test("check in key", async () => {
    const schema = {
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
    };
    const errors = validateSoke(
      schema,
      {
        phone: "133",
        code: "11",
        password: "123",
        passwordAgain: "456",
      },
      "password"
    );
    expect(errors).toEqual({
      password: "password is too weak",
    });

    const err = firstError(schema, errors);
    expect(err).toEqual("password is too weak");

    try {
      throwFirstError(schema, errors);
    } catch (err) {
      expect(err).toEqual(Error("password is too weak"));
    }
  });
});
