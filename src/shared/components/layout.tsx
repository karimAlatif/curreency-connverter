import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';

// export const useStyles = makeStyles(theme => ({
//   mainContent: {
//     paddingLeft: theme.spacing(4),
//     paddingTop: theme.spacing(14.2),
//     paddingBottom: theme.spacing(2.2),
//     paddingRight: theme.spacing(4),
//     [theme.breakpoints.down('xs')]: {
//       paddingLeft: theme.spacing(4),
//     },
//   },
// }));

interface Props {
  children: React.ReactNode;
  background?: string;
}

export default function Layout(props: Props) {
  const {children, background} = props;
  // const classes = useStyles();

  return (
    <>
      <main className={clsx(background)}>{children}</main>
    </>
  );
}
