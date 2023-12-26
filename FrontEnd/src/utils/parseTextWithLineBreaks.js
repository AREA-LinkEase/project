import React from "react";

const parseTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index !== text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
};

export default parseTextWithLineBreaks;