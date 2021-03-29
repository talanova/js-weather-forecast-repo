function loopTemplate(tpl: string, data: any): string {
  const re = /{{for ([^}]+)}}((?:\s|\S)+){{endfor}}/gi;
  return tpl.replace(re, (match, param, body) => {
    if (data[param]) {
      return data[param]
        .map((el: string, index: number) =>
          // eslint-disable-next-line no-use-before-define
          internal(body, el, index, data[param].length)
        )
        .join("");
    }
    return "";
  });
}

function ifTemplate(
  tpl: string,
  data: any,
  indexInLoop: number = -1,
  loopLength: number = -1
): string {
  const re = /{{if ([^}]+)}}((?:\s|\S)+){{endif}}/gi;

  return tpl.replace(re, (match, param, body) => {
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
  });
}

function keyTemplate(tpl: string, data: any): string {
  const re = /{{([^}]+)}}/gi;
  return tpl.replace(re, (match, param) => {
    return data[param] ? data[param] : "";
  });
}

function internal(
  tpl: string,
  data: any,
  indexInLoop: number = -1,
  loopLength: number = -1
): string {
  let replaced = loopTemplate(tpl, data);
  replaced = ifTemplate(replaced, data, indexInLoop, loopLength);
  return keyTemplate(replaced, data);
}

export function template(tpl: string, data: any): string {
  return internal(tpl, data);
}
