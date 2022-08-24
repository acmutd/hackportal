import React from 'react';
import DescriptionIcon from '@material-ui/icons/Description';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Blue from '@material-ui/core/colors/blue';
import Red from '@material-ui/core/colors/red';

/**
 * Doc Link Component
 *
 * Links for documents section in hackerpack
 * props.type determines the icon that corresponds to specified type
 */

function DocLink(props: { type: 'doc' | 'pdf'; link: string; title: string }) {
  let icon = <></>;
  if (props.type == 'doc') {
    icon = <DescriptionIcon style={{ color: Blue[500], fontSize: 'large' }} />;
  } else if (props.type == 'pdf') {
    icon = <PictureAsPdfIcon style={{ color: Red[500], fontSize: 'medium' }} />;
  }

  return (
    <div>
      {icon}{' '}
      <a href={props.link} rel="noopener noreferrer" target="_blank">
        {props.title}
      </a>
    </div>
  );
}

export default DocLink;
