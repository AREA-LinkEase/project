export const HandleTypes = {
  ANY: 'any',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  STRING: 'string',
  OBJECT: 'object',
  ARRAY: 'array',
  DATE: 'date',
};

export const nodeGlobalStyles = {
  "NumberToBool": {
    "categories": "conversion",
    "name": "Number -> Bool",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.NUMBER,
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN
      }
    ],
    "background": "#00cfe8"
  },
  "NumberToString": {
    "categories": "conversion",
    "name": "Number -> String",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.NUMBER,
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.STRING
      }
    ],
    "background": "#00cfe8"
  },
  "StringToNumber": {
    "categories": "conversion",
    "name": "String -> Number",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.STRING,
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.NUMBER
      }
    ],
    "background": "#00cfe8"
  },
  "StringToObject": {
    "categories": "conversion",
    "name": "String -> Object",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.STRING,
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.OBJECT
      }
    ],
    "background": "#00cfe8"
  },
  "ObjectToString": {
    "categories": "conversion",
    "name": "Object -> String",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.OBJECT,
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.STRING
      }
    ],
    "background": "#00cfe8"
  },
  "argument": {
    "categories": "variable",
    "name": "Argument",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.ANY
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "text"
    }
  },
  "environment": {
    "categories": "variable",
    "name": "Env",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.STRING
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.ANY
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "text"
    }
  },
  "variableBoolean": {
    "categories": "variable",
    "name": "Boolean",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "select",
      "elements": ["YES", "NO"]
    }
  },
  "variableNumber": {
    "categories": "variable",
    "name": "Number",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.NUMBER
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "text"
    }
  },
  "variableString": {
    "categories": "variable",
    "name": "String",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.STRING
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "text"
    }
  },
  "variableArray": {
    "categories": "variable",
    "name": "Array",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.ARRAY
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "text"
    }
  },
  "variableObject": {
    "categories": "variable",
    "name": "Object",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.OBJECT
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "text"
    }
  },
  "stringBuilder": {
    "categories": "variable",
    "name": "Str Builder",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.STRING
      }
    ],
    "background": "#e83e8c",
    valuePicker: {
      "type": "text"
    }
  },
  "variableRecurrence": {
    "categories": "variable",
    "name": "Recurrence",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.DATE
      }
    ],
    "background": "#ea5455",
    valuePicker: {
      "type": "recurrence"
    }
  },
  "variableDate": {
    "categories": "variable",
    "name": "Date",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.DATE
      }
    ],
    "background": "#ea5455",
    valuePicker: {
      "type": "date"
    }
  },
  "start": {
    "categories": "mark",
    "name": "Start",
    inputs: [],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.ANY
      }
    ],
    "background": "#7367f0"
  },
  "end": {
    "categories": "mark",
    "name": "End",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.ANY
      }
    ],
    outputs: [],
    "background": "#7367f0"
  },
  "if": {
    "categories": "control",
    "name": "If",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.ANY
      },
      {
        "id": "condition",
        "type": HandleTypes.BOOLEAN,
        "name": "Condition"
      }
    ],
    outputs: [
      {
        "id": "success",
        "type": HandleTypes.ANY,
        "name": "Success"
      },
      {
        "id": "failure",
        "type": HandleTypes.ANY,
        "name": "Failure"
      },
      {
        "id": "exit",
        "type": HandleTypes.ANY,
        "name": "Exit"
      },
    ],
    "background": "#000000"
  },
  "for": {
    "categories": "control",
    "name": "For",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.ANY
      },
      {
        "id": "count",
        "type": HandleTypes.NUMBER,
        "name": "Count"
      }
    ],
    outputs: [
      {
        "id": "action",
        "type": HandleTypes.NUMBER,
        "name": "Action"
      },
      {
        "id": "exit",
        "type": HandleTypes.ANY,
        "name": "Exit"
      },
    ],
    "background": "#000000"
  },
  "forEach": {
    "categories": "control",
    "name": "ForEach",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.ANY
      },
      {
        "id": "argument",
        "type": HandleTypes.ARRAY,
        "name": "Array"
      }
    ],
    outputs: [
      {
        "id": "action",
        "type": HandleTypes.ANY,
        "name": "Action"
      },
      {
        "id": "exit",
        "type": HandleTypes.ANY,
        "name": "Exit"
      },
    ],
    "background": "#000000"
  },
  "on": {
    "categories": "control",
    "name": "On",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.ANY
      },
      {
        "id": "condition",
        "type": HandleTypes.DATE,
        "name": "Time"
      }
    ],
    outputs: [
      {
        "id": "success",
        "type": HandleTypes.ANY,
        "name": "Action"
      },
      {
        "id": "exit",
        "type": HandleTypes.ANY,
        "name": "Exit"
      },
    ],
    "background": "#000000"
  },
  "at": {
    "categories": "control",
    "name": "At",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.ANY
      },
      {
        "id": "element",
        "type": HandleTypes.ANY,
        "name": "Element"
      },
      {
        "id": "key",
        "type": HandleTypes.STRING,
        "name": "Key"
      },
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.ANY,
        "name": "Exit"
      },
    ],
    "background": "#000000"
  },
  "request": {
    "categories": "event",
    "name": "Request",
    inputs: [
      {
        "id": "entry",
        "type": HandleTypes.ANY
      },
      {
        "id": "service",
        "type": HandleTypes.STRING,
        "name": "Service"
      },
      {
        "id": "body",
        "type": HandleTypes.OBJECT,
        "name": "Body"
      },
      {
        "id": "url",
        "type": HandleTypes.STRING,
        "name": "Url"
      },
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.OBJECT,
        "name": "Exit"
      },
      {
        "id": "status",
        "type": HandleTypes.NUMBER,
        "name": "Status"
      },
    ],
    "background": "#28c76f",
    valuePicker: {
      "type": "select",
      "elements": ["POST", "GET", "PUT", "DELETE"]
    }
  },
  "!=": {
    "categories": "comparison",
    "name": "!=",
    inputs: [
      {
        "id": "first",
        "type": HandleTypes.ANY
      },
      {
        "id": "second",
        "type": HandleTypes.ANY
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN,
      },
    ],
    "background": "#ff9f43"
  },
  "<": {
    "categories": "comparison",
    "name": "<",
    inputs: [
      {
        "id": "first",
        "type": HandleTypes.ANY
      },
      {
        "id": "second",
        "type": HandleTypes.ANY
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN,
      },
    ],
    "background": "#ff9f43"
  },
  "<=": {
    "categories": "comparison",
    "name": "<=",
    inputs: [
      {
        "id": "first",
        "type": HandleTypes.ANY
      },
      {
        "id": "second",
        "type": HandleTypes.ANY
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN,
      },
    ],
    "background": "#ff9f43"
  },
  ">=": {
    "categories": "comparison",
    "name": ">=",
    inputs: [
      {
        "id": "first",
        "type": HandleTypes.ANY
      },
      {
        "id": "second",
        "type": HandleTypes.ANY
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN,
      },
    ],
    "background": "#ff9f43"
  },
  "==": {
    "categories": "comparison",
    "name": "==",
    inputs: [
      {
        "id": "first",
        "type": HandleTypes.ANY
      },
      {
        "id": "second",
        "type": HandleTypes.ANY
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN,
      },
    ],
    "background": "#ff9f43"
  },
  ">": {
    "categories": "comparison",
    "name": ">",
    inputs: [
      {
        "id": "first",
        "type": HandleTypes.ANY
      },
      {
        "id": "second",
        "type": HandleTypes.ANY
      }
    ],
    outputs: [
      {
        "id": "exit",
        "type": HandleTypes.BOOLEAN,
      },
    ],
    "background": "#ff9f43"
  },
}
