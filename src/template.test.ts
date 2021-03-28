import { template } from "./template";

describe("template", () => {
  const data = {
    name: "test-name",
    friends: [
      { name: "first-friend-name" },
      { name: "second-friend-name" },
      { name: "third-friend-name" },
    ],
  };

  describe("basic data placing", () => {
    it("puts data in placeholders", () => {
      expect(template("Hi, {{name}}!", data)).toBe("Hi, test-name!");
    });

    it("puts empty string if no data provided", () => {
      expect(template("Hi, {{name}} {{surname}}!", data)).toBe(
        "Hi, test-name !"
      );
    });

    it("replace all placeholdes", () => {
      expect(template("Hi, {{name}}! My name is {{name}} too.", data)).toBe(
        "Hi, test-name! My name is test-name too."
      );
    });
  });

  describe("for", () => {
    it("replace all placeholdes inside loop", () => {
      expect(
        template(
          "Hi, my name is {{name}}. And my friends are {{for friends}}{{name}}, {{endfor}}.",
          data
        )
      ).toBe(
        "Hi, my name is test-name. And my friends are first-friend-name, second-friend-name, third-friend-name, ."
      );
    });

    it("replace all placeholdes inside loop with notIsLastElement", () => {
      expect(
        template(
          "Hi, my name is {{name}}. And my friends are {{for friends}}{{name}}{{if notIsLastElement}}, {{endif}}{{endfor}}.",
          data
        )
      ).toBe(
        "Hi, my name is test-name. And my friends are first-friend-name, second-friend-name, third-friend-name."
      );
    });

    it("replace all placeholdes inside loop with isLastElement", () => {
      expect(
        template(
          "Hi, my name is {{name}}. And my friends are {{for friends}}{{name}}{{if isLastElement}} and so on{{else}}, {{endif}}{{endfor}}.",
          data
        )
      ).toBe(
        "Hi, my name is test-name. And my friends are first-friend-name, second-friend-name, third-friend-name and so on."
      );
    });
  });

  describe("if else", () => {
    it("replace placeholders in if...else statement, first", () => {
      expect(template("{{if cond}}1{{else}}2{{endif}}", { cond: true })).toBe(
        "1"
      );
    });
    it("replace placeholders in if...else statement, second", () => {
      expect(template("{{if cond}}1{{else}}2{{endif}}", { cond: false })).toBe(
        "2"
      );
    });
    it("replace placeholders in if...else statements, third", () => {
      expect(template("{{if cond}}1{{else}}2{{endif}}", {})).toBe("");
    });

    it("replace placeholder in only if statement, first", () => {
      expect(template("{{if cond}}1{{endif}}", { cond: true })).toBe("1");
    });
    it("replace placeholder in only if statement, second", () => {
      expect(template("{{if cond}}1{{endif}}", { cond: false })).toBe("");
    });
    it("replace placeholder in only if statement, third", () => {
      expect(template("{{if cond}}{{cond}}{{endif}}", { cond: true })).toBe(
        "true"
      );
    });
    it("replace placeholder in only if statement, fourth", () => {
      expect(
        template("{{if cond}}-{{condition}}-{{endif}}", { cond: true })
      ).toBe("--");
    });
    it("replace placeholder in only if statement, fifth", () => {
      expect(
        template("{{if cond}}-{{condition}}-{{endif}}", { cond: true })
      ).toBe("--");
    });
    it("replace placeholder in only if statement, sixth", () => {
      expect(template("{{if cond}}{{endif}}", { cond: true })).toBe("");
    });
  });
});
