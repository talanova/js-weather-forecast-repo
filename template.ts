function internal(
  tpl: string,
  data: any,
  indexInLoop: number = -1,
  LoopLength: number = -1
) {
  tpl = tpl.replace(
    /{{for ([^\}]+)}}((?:\s|\S)+){{endfor}}/gi,
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

  tpl = tpl.replace(
    /{{if ([^\}]+)}}((?:\s|\S)+){{endif}}/gi,
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
        if (indexInLoop !== LoopLength - 1) {
          return arr[0];
        } else if (arr.length === 2) {
          return arr[1];
        }
        return "";
      } else if (param === "isLastElement") {
        if (indexInLoop === LoopLength - 1) {
          return arr[0];
        } else if (arr.length === 2) {
          return arr[1];
        }
        return "";
      }
      return "";
    }
  );

  return tpl.replace(/{{([^\}]+)}}/gi, (match, param) => {
    return data[param] ? data[param] : "";
  });
}

export function template(tpl: string, data: any): string {
  return internal(tpl, data);
}
