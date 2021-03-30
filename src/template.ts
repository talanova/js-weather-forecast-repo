function loopTemplate(tpl: string, data: any): string {
  const re = /{{for ([^}]+)}}((?:\s|\S)+){{endfor}}/gim;
  return tpl.replace(re, (match, param, body) => {
    const arr: string[] = param.split("as").map((x: string) => x.trim());
    const first: string = arr[0];
    const second: string = arr.length === 2 ? arr[1] : "";

    if (data[first]) {
      return data[first]
        .map((el: any, index: number) => {
          // eslint-disable-next-line no-use-before-define
          return internal(body, data, second, el, index, data[first].length);
        })
        .join("");
    }
    return "";
  });
}

function ifTemplate(
  tpl: string,
  data: any,
  item: string = "",
  itemData: any = {},
  indexInLoop: number = -1,
  loopLength: number = -1
): string {
  const re = /{{if ([^}]+)}}((?:\s|\S)+){{endif}}/gim;
  return tpl.replace(re, (match, param, body) => {
    const arr: string[] = body.split("{{else}}");
    const ifBody: string = arr[0];
    const elseBody: string = arr.length === 2 ? arr[1] : "";

    if (param === "isLastElement") {
      if (indexInLoop === loopLength - 1) {
        return internal(ifBody, data, item, itemData, indexInLoop, loopLength);
      } else if (arr.length === 2) {
        return internal(
          elseBody,
          data,
          item,
          itemData,
          indexInLoop,
          loopLength
        );
      }
      return "";
    }

    if (param === "notIsLastElement") {
      if (indexInLoop !== loopLength - 1) {
        return internal(ifBody, data, item, itemData, indexInLoop, loopLength);
      } else if (arr.length === 2) {
        return internal(
          elseBody,
          data,
          item,
          itemData,
          indexInLoop,
          loopLength
        );
      }
      return "";
    }

    if (param.startsWith(`${item}.`)) {
      if (itemData[param.replace(`${item}.`, "")]) {
        return internal(ifBody, data, item, itemData, indexInLoop, loopLength);
      }
      if (arr.length === 2) {
        return internal(
          elseBody,
          data,
          item,
          itemData,
          indexInLoop,
          loopLength
        );
      }
      return "";
    }

    if (param in data) {
      if (data[param]) {
        return internal(ifBody, data, item, itemData, indexInLoop, loopLength);
      }
      if (arr.length === 2) {
        return internal(
          elseBody,
          data,
          item,
          itemData,
          indexInLoop,
          loopLength
        );
      }
      return "";
    }

    return "";
  });
}

function keyTemplate(
  tpl: string,
  data: any,
  item: string = "",
  itemData: any = {}
): string {
  const re = /{{([^}]+)}}/gi;
  return tpl.replace(re, (match, param) => {
    if (param.startsWith(`${item}.`)) {
      const current = param.replace(`${item}.`, "");
      return itemData[current] ? itemData[current] : "";
    }
    return data[param] ? data[param] : "";
  });
}

function internal(
  tpl: string,
  data: any,
  item: string = "",
  itemData: any = {},
  indexInLoop: number = -1,
  loopLength: number = -1
): string {
  let text = loopTemplate(tpl, data);
  text = ifTemplate(text, data, item, itemData, indexInLoop, loopLength);
  return keyTemplate(text, data, item, itemData);
}

export function template(tpl: string, data: any): string {
  const text = internal(tpl, data);
  return keyTemplate(text, data);
}
