import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SelectedFilters = Record<string, string[]>

type FilterStoreState = {
	filters: SelectedFilters
	hasHydrated: boolean
}

type FilterStoreAction = {
	applyFilters: (filters: SelectedFilters) => void
	clearFilters: () => void
	setHasHydrated: (value: boolean) => void
}

type FilterStore = FilterStoreState & FilterStoreAction

export const useFilterStore = create<FilterStore>()(
	persist(
		set => ({
			filters: {},
			hasHydrated: false,
			applyFilters: filters => set({ filters }),
			clearFilters: () => set({ filters: {} }),
			setHasHydrated: value => set({ hasHydrated: value })
		}),
		{
			name: 'filterStorage',
			partialize: state => ({ filters: state.filters }),
			onRehydrateStorage: () => state => {
				state?.setHasHydrated(true)
			}
		}
	)
)
