import { useRecoilValue } from 'recoil';

import { currentUserState } from '@/auth/states/currentUserState';
import { TextInput } from '@/ui/input/components/TextInput';

export function EmailField() {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <TextInput
      value={currentUser?.email}
      disabled
      fullWidth
      key={'email-' + currentUser?.id}
    />
  );
}
