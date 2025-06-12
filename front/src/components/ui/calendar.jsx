"use client";
import { useState, useEffect, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import {
  format,
  getYear,
  setMonth as setMonthOfDate,
  setYear,
  isValid,
  isAfter,
  eachYearOfInterval,
} from "date-fns";
import "react-day-picker/dist/style.css";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  ArrowRight,
  LucideCalendarDays,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ScrollArea } from "./scroll-area";

export default function DatePicker({
  value,
  onChange,
  variant = "full",
  className,
  readOnly = false,
}) {
  const [viewDate, setViewDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSelectingYear, setIsSelectingYear] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    if (value && isValid(value)) {
      setViewDate(isAfter(value, today) ? today : value);
    } else {
      setViewDate(today);
    }
  }, [value, showDatePicker]);

  const handleDateSelect = (date) => {
    if (!date) return onChange(null);
    const selectedDateNormalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (isAfter(selectedDateNormalized, today)) {
      onChange(today);
    } else {
      onChange(date);
    }
    setShowDatePicker(false);
  };

  const handleMonthSelect = (monthIndex) => {
    const newMonthDate = setMonthOfDate(viewDate, monthIndex);
    if (getYear(newMonthDate) === getYear(today) && monthIndex > today.getMonth()) {
      setViewDate(setMonthOfDate(today, today.getMonth()));
    } else {
      setViewDate(newMonthDate);
    }
    setIsSelectingYear(false);
  };

  const handleYearChange = (year) => {
    const maxYear = getYear(today);
    const newYear = Math.min(year, maxYear);
    const updated = setYear(viewDate, newYear);
    if (newYear === maxYear && viewDate.getMonth() > today.getMonth()) {
      setViewDate(setMonthOfDate(updated, today.getMonth()));
    } else {
      setViewDate(updated);
    }
    setIsSelectingYear(false);
  };

  const disableFutureDates = (date) => isAfter(date, today);

  const maxYearAllowed = getYear(today);
  const years = useMemo(
    () =>
      eachYearOfInterval({
        start: new Date(maxYearAllowed - 100, 0, 1),
        end: new Date(maxYearAllowed, 0, 1),
      })
        .map((d) => getYear(d))
        .reverse(),
    [maxYearAllowed]
  );

  return (
    <div className={cn("flex items-center", variant === "icon" ? "gap-4" : "gap-2", className)}>
      <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full sm:w-[200px] border border-input rounded-md text-sm px-3 py-2 flex items-center justify-between transition hover:ring-1 focus:outline-none focus:ring-2",
              readOnly && "cursor-not-allowed text-gray-500 bg-gray-100",
              variant === "full" && "hover:bg-gray-50"
            )}
            disabled={readOnly}
          >
            {value && isValid(value) ? format(value, "dd/M/yyyy") : "---"}
            <LucideCalendarDays className="h-4 w-4 ml-2" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[95vw] max-w-[360px] sm:w-auto sm:max-w-none p-4 rounded-lg shadow-md bg-white border border-gray-200"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Date Picker */}
            <div className="flex flex-col items-center">
              <DayPicker
                mode="single"
                selected={value}
                onSelect={handleDateSelect}
                month={viewDate}
                onMonthChange={setViewDate}
                showOutsideDays
                fixedWeeks
                captionLayout="dropdown"
                disabled={disableFutureDates}
                classNames={{
                  day: "w-9 h-9 text-sm hover:bg-blue-100 rounded-full",
                  day_selected: "bg-blue-500 text-white rounded-full",
                  day_today: "border border-blue-500",
                  day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
                  caption_label: "hidden",
                  caption_dropdowns: "hidden",
                }}
                components={{
                  Caption: ({ displayMonth, goToMonth }) => {
                    const currentMonth = displayMonth.getMonth();
                    const currentYear = getYear(displayMonth);
                    const canGoToNextMonth = !isAfter(
                      setMonthOfDate(displayMonth, currentMonth + 1),
                      setMonthOfDate(today, today.getMonth())
                    );

                    return (
                      <div className="flex items-center justify-between p-2">
                        <button
                          onClick={() =>
                            goToMonth(setMonthOfDate(displayMonth, currentMonth - 1))
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </button>
                        <div className="flex-1 text-center font-medium text-sm">
                          {format(displayMonth, "MMMM yyyy")}
                        </div>
                        <button
                          onClick={() =>
                            goToMonth(setMonthOfDate(displayMonth, currentMonth + 1))
                          }
                          className="p-1 hover:bg-gray-200 rounded"
                          disabled={!canGoToNextMonth}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  },
                }}
              />
            </div>

            {/* Year/Month Selector */}
            <div className="flex flex-col items-center sm:border-l sm:pl-4">
              <div className="flex items-center justify-between w-full mb-2 gap-2">
                <button
                  onClick={() => setViewDate((prev) => setYear(prev, getYear(prev) - 1))}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <div
                  className="text-sm font-semibold cursor-pointer"
                  onClick={() => setIsSelectingYear((prev) => !prev)}
                >
                  {getYear(viewDate)}
                </div>
                <button
                  onClick={() =>
                    setViewDate((prev) =>
                      setYear(prev, Math.min(getYear(prev) + 1, maxYearAllowed))
                    )
                  }
                  className="p-1 hover:bg-gray-200 rounded"
                  disabled={getYear(viewDate) >= maxYearAllowed}
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>

              {isSelectingYear ? (
                <ScrollArea className="h-48 w-full pr-1">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    {years.map((year) => (
                      <button
                        key={year}
                        onClick={() => handleYearChange(year)}
                        className={cn(
                          "text-sm py-1 rounded-md hover:bg-blue-100",
                          getYear(viewDate) === year && "bg-blue-500 text-white font-bold"
                        )}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="grid grid-cols-3 gap-1">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                    (month, idx) => {
                      const futureMonth = getYear(viewDate) === getYear(today) && idx > today.getMonth();
                      return (
                        <button
                          key={month}
                          onClick={() => handleMonthSelect(idx)}
                          className={cn(
                            "text-sm rounded-md w-14 py-2 hover:bg-blue-100",
                            viewDate.getMonth() === idx && "bg-blue-500 text-white font-bold",
                            futureMonth && "text-gray-400 opacity-50 cursor-not-allowed"
                          )}
                          disabled={futureMonth}
                        >
                          {month}
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}