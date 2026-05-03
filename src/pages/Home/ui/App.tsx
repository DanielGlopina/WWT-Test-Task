import { useFilterStore } from '@/shared/store/store'

import FilterModal from './FilterModal'

export const App = () => {
	const filters = useFilterStore(state => state.filters)
	const hasHydrated = useFilterStore(state => state.hasHydrated)
	const filtersPreview = hasHydrated ? filters : { status: 'hydrating' }

	return (
		<section className="w-full min-h-dvh px-6 py-10">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="mb-8 text-center text-6xl text-gray-600">
				WinWinTravel frontend test task
			</h1>

			<div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6">
				<FilterModal />

				<section className="w-full rounded-xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
					<p className="mb-3 text-sm font-medium text-slate-700">
						{'Current selected filters (debug JSON)'}
					</p>
					<pre className="max-h-72 overflow-auto rounded-lg bg-slate-900 p-4 text-xs leading-5 text-slate-100">
						{JSON.stringify(filtersPreview, null, 2)}
					</pre>
				</section>
			</div>
		</section>
	)
}
