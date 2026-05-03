import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useFilterData } from '@/shared/api/filterDataQuery'
import { useFilterStore } from '@/shared/store/store'
import { Button } from '@components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@components/ui/dialog'

import { toArrayRecord, toSetRecord } from '../model/lib'
import type { SelectedState } from '../model/types'
import { FilterFields } from './FilterFields'

const FilterModal = () => {
	const { t } = useTranslation('filter')
	const { data, isPending, isError, error } = useFilterData()
	const storedFilters = useFilterStore(state => state.filters)
	const hasHydrated = useFilterStore(state => state.hasHydrated)
	const applyFilters = useFilterStore(state => state.applyFilters)
	const clearFilters = useFilterStore(state => state.clearFilters)
	const [selected, setSelected] = useState<SelectedState>(() =>
		toSetRecord(storedFilters)
	)

	useEffect(() => {
		if (!hasHydrated) {
			return
		}
		setSelected(toSetRecord(storedFilters))
	}, [hasHydrated, storedFilters])

	const toggle = (fieldId: string, optionId: string) => {
		setSelected(prev => {
			const next = { ...prev }
			const set = new Set(next[fieldId] ?? [])
			if (set.has(optionId)) {
				set.delete(optionId)
			} else {
				set.add(optionId)
			}
			next[fieldId] = set
			return next
		})
	}

	const handleApply = () => {
		applyFilters(toArrayRecord(selected))
	}

	const handleClear = () => {
		setSelected({})
		clearFilters()
	}

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">{t('actions.open')}</Button>
			</DialogTrigger>
			<DialogContent className="wwt-filter-modal max-h-[90vh] overflow-hidden p-0 sm:max-w-[920px]">
				<DialogHeader className="border-b border-[#d9d9d9] px-6 py-4">
					<DialogTitle className="text-center text-[18px] font-semibold text-[#2b2b2b]">
						{t('title')}
					</DialogTitle>
				</DialogHeader>

				<form
					onSubmit={event => {
						event.preventDefault()
						handleApply()
					}}
				>
					<section className="max-h-[calc(90vh-140px)] overflow-auto">
						{isPending ? (
							<div
								role="status"
								className="px-6 py-5 text-[#2b2b2b]"
							>
								{t('states.loading')}
							</div>
						) : null}
						{isError ? (
							<div
								role="alert"
								className="px-6 py-5 text-[#2b2b2b]"
							>
								{t('states.error', { message: String(error) })}
							</div>
						) : null}
						{!isPending && !isError ? (
							<FilterFields
								filterItems={data?.filterItems}
								selected={selected}
								toggle={toggle}
							/>
						) : null}
					</section>

					<footer className="relative flex items-center justify-center border-t border-[#d9d9d9] bg-white px-6 py-4">
						<Button
							type="submit"
							className="h-10 rounded-[6px] bg-[#ff6a00] px-12 text-[14px] font-semibold text-white hover:bg-[#f26100]"
						>
							{t('actions.apply')}
						</Button>
						<button
							type="button"
							onClick={handleClear}
							className="absolute right-6 text-[11px] font-normal text-[#078691] underline-offset-2 hover:underline"
						>
							{t('actions.clearAll')}
						</button>
					</footer>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default FilterModal
