/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Contrast as ContrastIcon } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Contrast = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.CONTRAST}
    label={t('contrastTool')}
    Icon={ContrastIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Contrast.defaultProps = {
  isSelected: false,
};

Contrast.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Contrast;