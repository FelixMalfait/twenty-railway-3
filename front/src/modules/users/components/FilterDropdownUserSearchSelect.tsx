import { useFilteredSearchEntityQuery } from '@/search/hooks/useFilteredSearchEntityQuery';
import { FilterDropdownEntitySearchSelect } from '@/ui/filter-n-sort/components/FilterDropdownEntitySearchSelect';
import { filterDropdownSearchInputScopedState } from '@/ui/filter-n-sort/states/filterDropdownSearchInputScopedState';
import { filterDropdownSelectedEntityIdScopedState } from '@/ui/filter-n-sort/states/filterDropdownSelectedEntityIdScopedState';
import { useRecoilScopedState } from '@/ui/recoil-scope/hooks/useRecoilScopedState';
import { useRecoilScopedValue } from '@/ui/recoil-scope/hooks/useRecoilScopedValue';
import { Entity } from '@/ui/relation-picker/types/EntityTypeForSelect';
import { TableContext } from '@/ui/table/states/TableContext';
import { useSearchUserQuery } from '~/generated/graphql';

export function FilterDropdownUserSearchSelect() {
  const filterDropdownSearchInput = useRecoilScopedValue(
    filterDropdownSearchInputScopedState,
    TableContext,
  );

  const [filterDropdownSelectedEntityId] = useRecoilScopedState(
    filterDropdownSelectedEntityIdScopedState,
    TableContext,
  );

  const usersForSelect = useFilteredSearchEntityQuery({
    queryHook: useSearchUserQuery,
    searchOnFields: ['firstName', 'lastName'],
    orderByField: 'lastName',
    selectedIds: filterDropdownSelectedEntityId
      ? [filterDropdownSelectedEntityId]
      : [],
    mappingFunction: (entity) => ({
      id: entity.id,
      entityType: Entity.User,
      name: `${entity.displayName}`,
      avatarType: 'rounded',
    }),
    searchFilter: filterDropdownSearchInput,
  });

  return (
    <FilterDropdownEntitySearchSelect
      entitiesForSelect={usersForSelect}
      context={TableContext}
    />
  );
}
