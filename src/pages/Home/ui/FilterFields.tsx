import type { FilterItem } from '@/shared/api/types/Filter'
import { Checkbox } from '@components/ui/checkbox'
import { Field, FieldGroup } from '@components/ui/field'
import { Label } from '@components/ui/label'

import type { SelectedState } from '../model/types'

type Props = {
	filterItems: FilterItem[] | undefined
	selected: SelectedState
	toggle: (fieldId: string, optionId: string) => void
}

export const FilterFields = ({ filterItems, selected, toggle }: Props) => {
	if (!filterItems?.length) {
		return null
	}

	return filterItems.map(field => (
		<section
			key={field.id}
			className="border-t border-[#d9d9d9] px-6 py-5 first:border-t-0"
		>
			<FieldGroup className="gap-4">
				<h3 className="text-[14px] font-semibold text-[#2b2b2b]">
					{field.name}
				</h3>
				<ul className="grid grid-cols-3 gap-x-10 gap-y-2">
					{field.options?.map(option => {
						const id = `${field.id}-${option.id}`
						return (
							<li key={option.id}>
								<Field
									orientation="horizontal"
									className="items-center justify-start gap-2"
								>
									<Checkbox
										id={id}
										checked={selected[field.id]?.has(option.id) ?? false}
										onCheckedChange={() => toggle(field.id, option.id)}
										className="border-[#2b2b2b] data-checked:bg-[#ff6a00] data-checked:border-[#ff6a00]"
									/>
									<Label
										htmlFor={id}
										className="text-[11px] font-normal text-[#2b2b2b]"
									>
										{option.name}
									</Label>
								</Field>
							</li>
						)
					})}
				</ul>
			</FieldGroup>
		</section>
	))
}
