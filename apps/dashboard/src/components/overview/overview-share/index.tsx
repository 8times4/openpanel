import { Button } from '@/components/ui/button';
import withSuspense from '@/hocs/with-suspense';
import { Globe2Icon } from 'lucide-react';

import { getShareByProjectId } from '@openpanel/db';

import { OverviewShare } from './overview-share';

type Props = {
  projectId: string;
};

const OverviewShareServer = async ({ projectId }: Props) => {
  const share = await getShareByProjectId(projectId);
  return <OverviewShare data={share} />;
};

export default withSuspense(OverviewShareServer, () => (
  <Button icon={Globe2Icon}>Private</Button>
));
