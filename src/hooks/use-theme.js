import { createMuiTheme } from '@material-ui/core/styles';
import { theme as themeConfig } from 'config';
import { useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { useSelector } from 'react-redux';

const uiTheme = createMuiTheme(themeConfig.common);

export default function useTheme(ref, theme = {}) {
  const { primary } = theme;
  const { current: node } = ref || {};

  useEffect(() => {
    !!node && !!primary && node.style.setProperty('--primary-color', primary);
  }, [node, primary]);

  const isDesktop = useMediaQuery(
    uiTheme.breakpoints.up(uiTheme.breakpoints.values.md)
  );

  const isTablet = useMediaQuery(
    uiTheme.breakpoints.between(
      uiTheme.breakpoints.values.sm,
      uiTheme.breakpoints.values.md
    )
  );

  const isMobile = useMediaQuery(
    uiTheme.breakpoints.down(uiTheme.breakpoints.values.sm)
  );

  return {
    isDesktop,
    isTablet,
    isMobile,
  };
}

export function useCollectorTheme(ref) {
  const { is_artist: isArtist, id } = useSelector(state => state.user.account);
  const theme = !isArtist && id ? themeConfig.collector : themeConfig.artist;

  return useTheme(ref, theme);
}
