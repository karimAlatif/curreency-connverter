import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';
import {withRouter} from 'react-router-dom';
import Header from './Header';

function WithLayout(props: RouteConfigComponentProps) {
  const {history, route: {routes = []} = {}} = props;
  return (
    <div>
      <Header />
      <React.Suspense fallback={'...'}>{renderRoutes(routes, {history})}</React.Suspense>
    </div>
  );
}

export default withRouter(WithLayout);
