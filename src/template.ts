function internal(
  tpl: string,
  data: any,
  indexInLoop: number = -1,
  loopLength: number = -1
) {
  // eslint-disable-next-line no-param-reassign
  tpl = tpl.replace(
    /{{for ([^\}]+)}}((?:\s|\S)+){{endfor}}/gi, // eslint-disable-line no-useless-escape
    (match, param, body) => {
      if (data[param]) {
        return data[param]
          .map((el: string, index: number) =>
            internal(body, el, index, data[param].length)
          )
          .join("");
      }
      return "";
    }
  );

  // eslint-disable-next-line no-param-reassign
  tpl = tpl.replace(
    /{{if ([^\}]+)}}((?:\s|\S)+){{endif}}/gi, // eslint-disable-line no-useless-escape
    (match, param, body) => {
      const arr: string[] = body.split("{{else}}");
      if (param in data) {
        if (data[param]) {
          return arr[0];
        }
        if (arr.length === 2) {
          return arr[1];
        }
        return "";
      } else if (param === "notIsLastElement") {
        if (indexInLoop !== loopLength - 1) {
          return arr[0];
        } else if (arr.length === 2) {
          return arr[1];
        }
        return "";
      } else if (param === "isLastElement") {
        if (indexInLoop === loopLength - 1) {
          return arr[0];
        } else if (arr.length === 2) {
          return arr[1];
        }
        return "";
      }
      return "";
    }
  );

  // eslint-disable-next-line no-useless-escape
  return tpl.replace(/{{([^\}]+)}}/gi, (match, param) => {
    return data[param] ? data[param] : "";
  });
}

export function template(tpl: string, data: any): string {
  return internal(tpl, data);
}
