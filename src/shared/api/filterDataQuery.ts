import { useQuery } from '@tanstack/react-query'

import type { FilterItem } from '@/shared/api/types/Filter'
import filterDataJsonUrl from '@/shared/temp/filterData.json?url'

export const FILTER_DATA_QUERY_KEY = ['filterData'] as const

export interface FilterDataResponse {
	filterItems: FilterItem[]
}

export const fetchFilterData = async (): Promise<FilterDataResponse> => {
	const response = await fetch(filterDataJsonUrl)
	if (!response.ok) {
		throw new Error(`Failed to load filter data: ${response.status}`)
	}
	return response.json()
}

export const useFilterData = () => {
	return useQuery({
		queryKey: FILTER_DATA_QUERY_KEY,
		queryFn: fetchFilterData,
		staleTime: Infinity
	})
}
