/** External Dependencies */
import React from 'react';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS } from 'utils/constants';
import TextControls from './TextControls';

const TextOptions = ({ t }) => {
  const [text, saveText] = useAnnotation({ name: TOOLS_IDS.TEXT });

  return <TextControls text={text} saveText={saveText} t={t} />;
};

export default TextOptions;