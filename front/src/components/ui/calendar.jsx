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

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, LucideCalendarDays, ChevronsLeft, ChevronsRight } from "lucide-react";
import { ScrollArea } from "./scroll-area";
export default function DatePicker({ value, onChange, variant = "full", className, readOnly = false }) {
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
    if (!date) {
      onChange(null);
      return;
    }

    
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
    
    if (getYear(newMonthDate) === getYear(today) && newMonthDate.getMonth() > today.getMonth()) {
      setViewDate(setMonthOfDate(today, today.getMonth()));
    } else {
      setViewDate(newMonthDate);
    }
    setIsSelectingYear(false);
  };

  const handleYearChange = (year) => {
    
    const maxYear = getYear(today);
    let newYear = Math.min(year, maxYear);

    
    if (newYear === maxYear && viewDate.getMonth() > today.getMonth()) {
      setViewDate(setMonthOfDate(setYear(viewDate, newYear), today.getMonth()));
    } else {
      setViewDate(setYear(viewDate, newYear));
    }
    setIsSelectingYear(false);
  };

  const disableFutureDates = (date) => {
    return isAfter(date, today);
  };

  const maxYearAllowed = getYear(today); 

  const years = useMemo(() => {
    return eachYearOfInterval({
      start: new Date(maxYearAllowed - 100, 0, 1), 
      end: new Date(maxYearAllowed, 0, 1),        
    }).map(date => getYear(date)).reverse(); 
  }, [maxYearAllowed]);


  return (
    <div className={cn("flex gap-5 items-center ", variant === "icon" && " gap-15")}>
      <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "border-0 rounded-md text-sm px-2 py-2 flex justify-between w-[200px] bg-none focus:ring-1 hover:ring-blue-500 hover:ring-1",
              variant === "full" && "hover:bg-gray-50 ",
              readOnly && "cursor-not-allowed text-gray-500",
              className
            )}
            disabled={readOnly}
          >
            {value && isValid(value) ? format(value, "dd/M/yyyy") : "---"}
            <LucideCalendarDays className="h-4 w-4 ml-2" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="flex w-auto gap-4 p-4">
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

                  const canGoToNextMonth = isAfter(
                    setMonthOfDate(displayMonth, currentMonth + 1),
                    setMonthOfDate(today, today.getMonth())
                  ) ? false : true; 

                  const canGoToPrevMonth = true; 

                  return (
                    <div className="flex items-center justify-between p-2">
                      <button
                        onClick={() => goToMonth(setMonthOfDate(displayMonth, currentMonth - 1))}
                        className="p-1 hover:bg-gray-200 rounded"
                        disabled={!canGoToPrevMonth} 
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <div className="flex-1 text-center font-medium">
                        {format(displayMonth, 'MMMM yyyy')}
                      </div>
                      <button
                        onClick={() => goToMonth(setMonthOfDate(displayMonth, currentMonth + 1))}
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

          <div className="flex flex-col items-center border-l pl-4">
            <div className="flex justify-between items-center w-full mb-2">
              <button
                onClick={() => setViewDate(prev => setYear(prev, getYear(prev) - 1))}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <div
                className="text-sm font-semibold cursor-pointer"
                onClick={() => setIsSelectingYear(!isSelectingYear)}
              >
                {getYear(viewDate)}
              </div>
              <button
                onClick={() => setViewDate(prev => {
                  const newYear = getYear(prev) + 1;
                  
                  return setYear(prev, Math.min(newYear, maxYearAllowed));
                })}
                className="p-1 hover:bg-gray-200 rounded"
                disabled={getYear(viewDate) >= maxYearAllowed} 
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>

            {isSelectingYear ? (
              <ScrollArea className="h-48 w-full pr-2">
                <div className="grid grid-cols-2 gap-1 text-center">
                  {years.map(year => (
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
                {[
                  "Jan", "Feb", "Mar", "Apr",
                  "May", "Jun", "Jul", "Aug",
                  "Sep", "Oct", "Nov", "Dec"
                ].map((m, idx) => {
                  const targetMonthDate = setMonthOfDate(viewDate, idx);
                  const isFutureMonthInCurrentYear = getYear(targetMonthDate) === getYear(today) && idx > today.getMonth();
                  return (
                    <button
                      key={m}
                      onClick={() => handleMonthSelect(idx)}
                      className={cn(
                        "text-sm py-1 rounded-md text-center hover:bg-blue-100 w-14 p-3",
                        viewDate.getMonth() === idx && "bg-blue-500 text-white font-bold",
                        isFutureMonthInCurrentYear && "text-gray-400 opacity-50 cursor-not-allowed" 
                      )}
                      disabled={isFutureMonthInCurrentYear} 
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}