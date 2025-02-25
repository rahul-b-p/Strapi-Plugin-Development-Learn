import { Main } from '@strapi/design-system';
import { Box, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTranslation } from '../utils/getTranslation';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Main>
      <div
        style={{
          width: '100%',
          height: '100vh',
          backgroundColor: 'red',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <h1 style={{ color: 'white', fontSize: '20px' }}>
          Welcome to {formatMessage({ id: getTranslation('plugin.name') })}
        </h1>
        <Box padding={1} margin={2} shadow="filterShadow" borderColor="warning200">
          <Typography textColor="neutral0"> Hello Plugin Developers!</Typography>
        </Box>
        <Link to={'/plugins/my-strapi-plugin/second-page'}>
          {' '}
          <button>To Get Features</button>{' '}
        </Link>
      </div>
    </Main>
  );
};

export { HomePage };
