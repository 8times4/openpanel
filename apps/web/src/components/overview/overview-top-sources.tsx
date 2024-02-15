'use client';

import { Chart } from '@/components/report/chart';
import {
  useEventFilters,
  useEventQueryFilters,
} from '@/hooks/useEventQueryFilters';
import { cn } from '@/utils/cn';

import { Widget, WidgetBody } from '../Widget';
import { WidgetButtons, WidgetHead } from './overview-widget';
import { useOverviewOptions } from './useOverviewOptions';
import { useOverviewWidget } from './useOverviewWidget';

interface OverviewTopSourcesProps {
  projectId: string;
}
export default function OverviewTopSources({
  projectId,
}: OverviewTopSourcesProps) {
  const { interval, range, previous } = useOverviewOptions();
  const {
    referrer,
    referrerName,
    referrerType,
    utmCampaign,
    utmContent,
    utmMedium,
    utmSource,
    utmTerm,
  } = useEventQueryFilters();
  const filters = useEventFilters();
  const [widget, setWidget, widgets] = useOverviewWidget('sources', {
    all: {
      title: 'Top sources',
      btn: 'All',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters: filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'referrer_name',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top groups',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    domain: {
      title: 'Top urls',
      btn: 'URLs',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters: filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'referrer',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    type: {
      title: 'Top types',
      btn: 'Types',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters: filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'referrer_type',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top types',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    utm_source: {
      title: 'UTM Source',
      btn: 'Source',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'properties.query.utm_source',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    utm_medium: {
      title: 'UTM Medium',
      btn: 'Medium',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'properties.query.utm_medium',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    utm_campaign: {
      title: 'UTM Campaign',
      btn: 'Campaign',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'properties.query.utm_campaign',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    utm_term: {
      title: 'UTM Term',
      btn: 'Term',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'properties.query.utm_term',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
    utm_content: {
      title: 'UTM Content',
      btn: 'Content',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters,
            id: 'A',
            name: 'session_start',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'properties.query.utm_content',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
  });

  return (
    <>
      <Widget className="col-span-6 md:col-span-3">
        <WidgetHead>
          <div className="title">{widget.title}</div>
          <WidgetButtons>
            {widgets.map((w) => (
              <button
                key={w.key}
                onClick={() => setWidget(w.key)}
                className={cn(w.key === widget.key && 'active')}
              >
                {w.btn}
              </button>
            ))}
          </WidgetButtons>
        </WidgetHead>
        <WidgetBody>
          <Chart
            hideID
            {...widget.chart}
            previous={false}
            onClick={(item) => {
              switch (widget.key) {
                case 'all':
                  referrerName.set(item.name);
                  setWidget('domain');
                  break;
                case 'domain':
                  referrer.set(item.name);
                  break;
                case 'type':
                  referrerType.set(item.name);
                  setWidget('domain');
                  break;
                case 'utm_source':
                  utmSource.set(item.name);
                  break;
                case 'utm_medium':
                  utmMedium.set(item.name);
                  break;
                case 'utm_campaign':
                  utmCampaign.set(item.name);
                  break;
                case 'utm_term':
                  utmTerm.set(item.name);
                  break;
                case 'utm_content':
                  utmContent.set(item.name);
                  break;
              }
            }}
          />
        </WidgetBody>
      </Widget>
    </>
  );
}
