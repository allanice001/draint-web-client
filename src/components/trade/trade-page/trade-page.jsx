import React, { useEffect, useMemo, useState } from 'react';
import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import ArtworkFullSearch from 'components/artwork/artwork-full-search/artwork-full-search';
import { ArtworkService } from 'services/artwork-service';
import CollectorCarousel from 'components/collector/collector-carousel/collector-carousel';
import Helmet from 'components/helmet';
import { Spinner } from 'components/loader/spinner-loader/spinner';
import { TabType } from 'constants/search.constants';
import TradeCarousel from 'components/trade/trade-carousel/trade-carousel';
import TradeCharts from 'components/trade/trade-charts/trade-charts';
import { TradeFooter } from 'components/trade/trade-footer/trade-footer';
import { getFilters } from 'components/search-page/search-components/filters/get-filters';
import { onDeleteCheck } from 'services/redirectCheckService';
import styles from './trade-page.module.scss';
import theme from 'config/mui-theme';
import { useHistory } from 'react-router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSearch } from 'hooks/useSearch';
import { useSelector } from 'react-redux';

const Analytic = AnalyticHelper.create();
const artworkService = new ArtworkService();

function TradePage() {
  useEffect(() => {
    Analytic.createEvent('PageView');
  });
  const user = useSelector(store => store.user);
  const history = useHistory();
  const { filtersOptions, filtersFormValue } = useSearch();
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (user.account.loading) window.scrollTo(0, 0);
  }, [user.account.loading]);

  onDeleteCheck(user, history);

  const matchesMd = useMediaQuery(
    theme.breakpoints.down(theme.breakpoints.values.md)
  );

  const filters = useMemo(() => {
    return getFilters({
      type: TabType.Artwork,
      filtersOptions,
      isOpen,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersOptions]);

  if (user.account.loading) return <Spinner full />;

  return (
    <div className={styles.trade_wrapper}>
      <Helmet />
      <TradeCarousel />
      <TradeCharts />
      <CollectorCarousel />
      <ArtworkFullSearch
        filters={filters}
        isOpen={isOpen}
        setOpen={setOpen}
        filtersOptions={filtersOptions}
        initialValues={filtersFormValue}
        method={artworkService.getAllTrade}
        matchesMd={matchesMd}
        headerRender={total => (
          <>
            <h3 className="group-title">Draint Art-market</h3>
            <p className="group-subtitle">
              {total} pieces currently available for resale
            </p>
          </>
        )}
      />
      <TradeFooter isArtist={user.account?.is_artist} />
    </div>
  );
}

export default TradePage;
