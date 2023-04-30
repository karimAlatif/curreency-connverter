import React, {ReactElement} from 'react';
import {useTranslation} from 'react-i18next';
import NotFound from './NotFound.svg';

function ErrorPage404(): ReactElement {
  const {t} = useTranslation();

  return (
    <div>
      <div>
        <div>
          <div>
            <img src={NotFound} width="100%" height="100%" />
          </div>
          <div style={{textAlign: 'center'}}>
            <h4 style={{fontFamily: 'Poppins', fontWeight: 500}}>{`${t('general.404.title')}`}</h4>
          </div>
          <div>
            <a href="/">
              <button
                color="primary"
                style={{paddingBottom: 3, paddingTop: 3, backgroundColor: '#0B6CB9'}}
              >
                {`${t('general.404.homeButton')}`}
              </button>
            </a>
          </div>
        </div>
      </div>

      {/*</Layout>*/}
    </div>
  );
}

export default ErrorPage404;
