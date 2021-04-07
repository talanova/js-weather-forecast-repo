function loopTemplate(tpl: string, data: any): string {
  const re = /{{for ([^}]+)}}((?:\s|\S)+){{endfor}}/gim;
  return tpl.replace(re, (match, param, body) => {
    const arr: string[] = param.split("as").map((x: string) => x.trim());
    const first: string = arr[0];
    const second: string | null = arr.length === 2 ? arr[1] : "";

    if (first in data) {
      return data[first]
        .map((el: any, index: number) => {
          // eslint-disable-next-line no-use-before-define
          return internal(body, data, index, data[first].length, second, el);
        })
        .join("");
    }
    return "";
  });
}

function ifTemplate(
  tpl: string,
  data: any,
  indexInLoop: number = -1,
  loopLength: number = -1,
  item: string,
  itemData: any
): string {
  const re = /{{if ([^}]+)}}((?:\s|\S)+){{endif}}/gim;
  return tpl.replace(re, (match, param, body) => {
    const arr: string[] = body.split("{{else}}");
    const ifBody: string = arr[0];
    const elseBody: string = arr.length === 2 ? arr[1] : "";

    if (param === "isLastElement") {
      if (indexInLoop === loopLength - 1) {
        return internal(ifBody, data, indexInLoop, loopLength, item, itemData);
      } else if (elseBody) {
        return internal(
          elseBody,
          data,
          indexInLoop,
          loopLength,
          item,
          itemData
        );
      }
      return "";
    }

    if (param === "notIsLastElement") {
      if (indexInLoop !== loopLength - 1) {
        return internal(ifBody, data, indexInLoop, loopLength, item, itemData);
      } else if (elseBody) {
        return internal(
          elseBody,
          data,
          indexInLoop,
          loopLength,
          item,
          itemData
        );
      }
      return "";
    }

    const paramArr: string[] = param.split(".").map((x: string) => x.trim());
    const first: string = paramArr[0];
    const second: string | null = paramArr.length === 2 ? paramArr[1] : null;

    if (!second) {
      if (item && first === item) {
        if (itemData) {
          return internal(
            ifBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        } else if (elseBody) {
          return internal(
            elseBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        }
      }

      if (first in data) {
        if (data[first]) {
          return internal(
            ifBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        } else if (elseBody) {
          return internal(
            elseBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        }
      }

      return "";
    }

    if (item && first === item) {
      if (second in itemData[first]) {
        if (itemData[first][second]) {
          return internal(
            ifBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        } else if (elseBody) {
          return internal(
            elseBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        }
        return "";
      }

      if (second in data[first]) {
        if (data[first][second]) {
          return internal(
            ifBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        } else if (elseBody) {
          return internal(
            elseBody,
            data,
            indexInLoop,
            loopLength,
            item,
            itemData
          );
        }
        return "";
      }

      return "";
    }
    return "";
  });
}

function keyTemplate(
  tpl: string,
  data: any,
  item?: string,
  itemData?: any
): string {
  const re = /{{([^}]+)}}/gi;
  return tpl.replace(re, (match, param) => {
    const arr: string[] = param.split(".").map((x: string) => x.trim());
    const first: string = arr[0];
    const second: string | null = arr.length === 2 ? arr[1] : null;

    if (!second) {
      if (item && first === item) {
        // eslint-disable-next-line no-unneeded-ternary
        return itemData ? itemData : "";
      }
      return first in data ? data[first] : "";
    }

    if (item && first === item) {
      return second in itemData ? itemData[second] : "";
    }

    if (first in data) {
      return second in data[first] ? data[first][second] : "";
    }

    return "";
  });
}

function internal(
  tpl: string,
  data: any,
  indexInLoop: number = -1,
  loopLength: number = -1,
  item: string = "",
  itemData: any = {}
): string {
  let text = loopTemplate(tpl, data);
  text = ifTemplate(text, data, indexInLoop, loopLength, item, itemData);
  return keyTemplate(text, data, item, itemData);
}

export function template(tpl: string, data: any): string {
  const text = internal(tpl, data);
  return keyTemplate(text, data);
}
