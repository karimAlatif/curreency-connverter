import React from 'react';

interface Props {
  children: React.ReactNode;
  background?: string;
}

export default function Layout(props: Props) {
  const {children, background} = props;
  // const classes = useStyles();

  return (
    <>
      <main className={background}>{children}</main>
    </>
  );
}
