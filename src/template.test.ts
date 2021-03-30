import { template } from "./template";

describe("template", () => {
  const data = {
    name: "test-name",
    age: 10,
    friends: [
      { name: "first-friend-name", age: 10 },
      { name: "second-friend-name", age: 15 },
      { name: "third-friend-name", age: 20 },
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
    it("replace all placeholdes inside loop with notIsLastElement", () => {
      expect(
        template(
          `Hi, my name is {{name}}.
And my friends are {{for friends as friend}}{{friend.name}}{{if notIsLastElement}}, {{endif}}{{endfor}}.`,
          data
        )
      ).toBe(
        `Hi, my name is test-name.
And my friends are first-friend-name, second-friend-name, third-friend-name.`
      );
    });

    it("replace all placeholdes inside loop with isLastElement", () => {
      expect(
        template(
          `Hi, my name is {{name}}.
And my friends are {{for friends as friend}}{{friend.name}}{{if isLastElement}} and so on{{else}}, {{endif}}{{endfor}}.`,
          data
        )
      ).toBe(
        `Hi, my name is test-name.
And my friends are first-friend-name, second-friend-name, third-friend-name and so on.`
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

  describe("template with html tags", () => {
    const tpl = `<div>
<p>Hi, my name is {{name}}{{if age}} and my age is {{age}}{{endif}}.</p>
<ul>{{for friends as item}}
<li>Hi, {{item.name}}, who are {{item.age}} years old! Are you a friend of {{name}}?</li>{{endfor}}
</ul>
</div>`;

    it("check template with html tags", () => {
      expect(template(tpl, data)).toBe(
        `<div>
<p>Hi, my name is test-name and my age is 10.</p>
<ul>
<li>Hi, first-friend-name, who are 10 years old! Are you a friend of test-name?</li>
<li>Hi, second-friend-name, who are 15 years old! Are you a friend of test-name?</li>
<li>Hi, third-friend-name, who are 20 years old! Are you a friend of test-name?</li>
</ul>
</div>`
      );
    });
  });
});
