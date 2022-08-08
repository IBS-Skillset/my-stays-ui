import React, { useEffect, useRef, useState } from 'react'
import { DateRange, Range } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DateRangePicker = () => {
  // date state
  const [range, setRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ])

  // open close
  const [open, setOpen] = useState(false)

  // get the target element to toggle
  const refOne: React.LegacyRef<HTMLDivElement> = useRef(null)

  useEffect(() => {
    // event listeners
    document.addEventListener('keydown', hideOnEscape, true)
    document.addEventListener('click', hideOnClickOutside, true)
  }, [])

  // hide dropdown on ESC press
  const hideOnEscape = (event: KeyboardEvent) => {
    // console.log(e.key)
    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // Hide on outside click
  const hideOnClickOutside = (event: MouseEvent) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (
      refOne.current &&
      event.target instanceof Node &&
      !refOne.current.contains(event.target)
    ) {
      setOpen(false)
    }
  }

  function dateFormat(dateRange: Range) {
    if (typeof dateRange === 'undefined') {
      return ''
    }
    if (
      typeof dateRange.startDate === 'undefined' ||
      typeof dateRange.endDate === 'undefined'
    ) {
      return ''
    }
    return (
      format(dateRange.startDate, 'MMM dd, yy') +
      ' - ' +
      format(dateRange.endDate, 'MMM dd, yy')
    )
  }

  return (
    <div className="calendarWrap">
      <input
        value={`${dateFormat(range[0])}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calendarElement"
          />
        )}
      </div>
    </div>
  )
}

export default DateRangePicker
