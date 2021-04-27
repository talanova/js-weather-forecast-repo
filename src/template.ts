type TemplateParamsType = {
  tpl: string;
  data: any;
  indexInLoop: number;
  loopLength: number;
  item: string | null;
  itemData: any;
};

function splitParam(
  param: string,
  spliter: string
): { first: string; second: string | null } {
  const arr: string[] = param.split(spliter).map((x: string) => x.trim());
  return {
    first: arr[0],
    second: arr.length === 2 ? arr[1] : null,
  };
}

function splitBranches(
  body: string
): { ifBody: string; elseBody: string | null } {
  const arr: string[] = body.split("{{else}}");
  return {
    ifBody: arr[0],
    elseBody: arr.length === 2 ? arr[1] : null,
  };
}

function loopTemplate(input: TemplateParamsType): string {
  const re = /{{for ([^}]+)}}((?:\s|\S)+){{endfor}}/gim;

  return input.tpl.replace(re, (match, param, body) => {
    const { first, second } = splitParam(param, "as");

    if (first in input.data && input.data[first] instanceof Array) {
      return input.data[first]
        .map((el: any, index: number) => {
          // eslint-disable-next-line no-use-before-define
          return internal({
            tpl: body,
            data: input.data,
            indexInLoop: index,
            loopLength: input.data[first].length,
            item: second,
            itemData: el,
          });
        })
        .join("");
    }
    return "";
  });
}

function parseIsLastElement(
  input: TemplateParamsType,
  ifBody: string,
  elseBody: string | null
) {
  if (input.indexInLoop === input.loopLength - 1) {
    return internal({ ...input, tpl: ifBody });
  }
  if (elseBody) {
    return internal({ ...input, tpl: elseBody });
  }
  return "";
}

function parseNotIsLastElement(
  input: TemplateParamsType,
  ifBody: string,
  elseBody: string | null
): string {
  if (input.indexInLoop !== input.loopLength - 1) {
    return internal({ ...input, tpl: ifBody });
  }
  if (elseBody) {
    return internal({ ...input, tpl: elseBody });
  }
  return "";
}

function ifTemplate(input: TemplateParamsType): string {
  const re = /{{if ([^}]+)}}((?:\s|\S)+){{endif}}/gim;

  return input.tpl.replace(re, (match, param, body) => {
    const { ifBody, elseBody } = splitBranches(body);

    if (param === "isLastElement") {
      return parseIsLastElement(input, ifBody, elseBody);
    }

    if (param === "notIsLastElement") {
      return parseNotIsLastElement(input, ifBody, elseBody);
    }

    const { first, second } = splitParam(param, ".");

    if (!second) {
      if (input.item && first === input.item) {
        if (input.itemData) {
          return internal({ ...input, tpl: ifBody });
        }
        if (elseBody) {
          return internal({ ...input, tpl: elseBody });
        }
      }

      if (first in input.data) {
        if (input.data[first]) {
          return internal({ ...input, tpl: ifBody });
        }
        if (elseBody) {
          return internal({ ...input, tpl: elseBody });
        }
      }
      return "";
    }

    if (input.item && first === input.item) {
      if (second in input.itemData[first]) {
        if (input.itemData[first][second]) {
          return internal({ ...input, tpl: ifBody });
        }
        if (elseBody) {
          return internal({ ...input, tpl: elseBody });
        }
        return "";
      }

      if (second in input.data[first]) {
        if (input.data[first][second]) {
          return internal({ ...input, tpl: ifBody });
        }
        if (elseBody) {
          return internal({ ...input, tpl: elseBody });
        }
        return "";
      }
      return "";
    }

    if (first in input.data) {
      if (second in input.data[first]) {
        if (input.data[first][second]) {
          return internal({ ...input, tpl: ifBody });
        }
        if (elseBody) {
          return internal({ ...input, tpl: elseBody });
        }
      }
      return "";
    }
    return "";
  });
}

function keyTemplate(input: TemplateParamsType): string {
  const re = /{{([^}]+)}}/gi;

  return input.tpl.replace(re, (match, param) => {
    const { first, second } = splitParam(param, ".");

    if (!second) {
      if (input.item && first === input.item) {
        // eslint-disable-next-line no-unneeded-ternary
        return input.itemData ? input.itemData : "";
      }
      return first in input.data ? input.data[first] : "";
    }

    if (input.item && first === input.item) {
      return second in input.itemData ? input.itemData[second] : "";
    }

    if (first in input.data) {
      return second in input.data[first] ? input.data[first][second] : "";
    }

    return "";
  });
}

function internal(input: TemplateParamsType): string {
  const current = { ...input, tpl: loopTemplate(input) };
  current.tpl = ifTemplate(current);
  return keyTemplate(current);
}

export function template(tpl: string, data: unknown): string {
  if (data instanceof Object) {
    const input = {
      tpl,
      data,
      indexInLoop: -1,
      loopLength: -1,
      item: null,
      itemData: {},
    };
    input.tpl = internal(input);
    return keyTemplate(input);
  }
  return "";
}
