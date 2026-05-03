import type { SelectedFilters } from '@/shared/store/store'

import type { SelectedState } from './types'

export const toSetRecord = (filters: SelectedFilters): SelectedState =>
	Object.fromEntries(
		Object.entries(filters).map(([fieldId, optionIds]) => [
			fieldId,
			new Set(optionIds)
		])
	) as SelectedState

export const toArrayRecord = (selected: SelectedState): SelectedFilters =>
	Object.fromEntries(
		Object.entries(selected).map(([fieldId, optionIds]) => [
			fieldId,
			Array.from(optionIds)
		])
	)
