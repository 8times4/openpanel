import { useEventQueryFilters } from '@/hooks/useEventQueryFilters';
import { getDefaultIntervalByRange, timeRanges } from '@/utils/constants';
import { mapKeys } from '@/utils/validation';
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsStringEnum,
  useQueryState,
} from 'nuqs';

const nuqsOptions = { history: 'push' } as const;

export function useOverviewOptions() {
  const [previous, setPrevious] = useQueryState(
    'name',
    parseAsBoolean.withDefault(true).withOptions(nuqsOptions)
  );
  const [range, setRange] = useQueryState(
    'range',
    parseAsStringEnum(mapKeys(timeRanges))
      .withDefault('7d')
      .withOptions(nuqsOptions)
  );
  const interval = getDefaultIntervalByRange(range);
  const [metric, setMetric] = useQueryState(
    'metric',
    parseAsInteger.withDefault(0).withOptions(nuqsOptions)
  );

  // Toggles
  const [liveHistogram, setLiveHistogram] = useQueryState(
    'live',
    parseAsBoolean.withDefault(false).withOptions(nuqsOptions)
  );

  return {
    previous,
    setPrevious,
    range,
    setRange,
    metric,
    setMetric,

    // Computed
    interval,

    // Toggles
    liveHistogram,
    setLiveHistogram,
  };
}
