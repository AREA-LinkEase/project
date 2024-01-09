import React from 'react';
export const formatTextBold = (text) => {
    const parts = text.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{part}</strong>;
      } else
        return part;
    });
};
