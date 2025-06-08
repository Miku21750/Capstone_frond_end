import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import {
  format,
  getYear,
  setMonth as setMonthOfDate,
  setYear,
  isValid,
  isAfter, 
} from "date-fns";
import "react-day-picker/dist/style.css";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, LucideCalendarDays } from "lucide-react";

export default function DatePicker({ value, onChange, variant = "full", className, readOnly = false }) {
  const [viewDate, setViewDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const handleDateSelect = (date) => {
    if (!date) {
      onChange(null);
      return;
    }

    let updatedDate = new Date(date);

    const selectedDayStart = new Date(updatedDate.getFullYear(), updatedDate.getMonth(), updatedDate.getDate());
    if (isAfter(selectedDayStart, today)) {
        updatedDate = today; 
    }

    onChange(updatedDate);
    setShowDatePicker(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setViewDate(prev => setMonthOfDate(prev, monthIndex));
  };

  const handleYearChange = (direction) => {
    setViewDate(prev => setYear(prev, getYear(prev) + direction));
  };

  
  const disableFutureDates = (date) => {
    
    
    
    return isAfter(date, today);
  };


  return (
    <div className={cn("flex gap-5 items-center ", variant === "icon" && " gap-15")}>
      {/* Date Picker */}
      <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "border-0 rounded-md text-sm px-2 py-2 flex justify-between w-[200px] bg-none focus:ring-1 hover:ring-blue-500 hover:ring-1",
              variant === "full" && "hover:bg-gray-50 ",
              readOnly && "cursor-not-allowed text-gray-500",
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
              captionLayout="label"
              
              disabled={disableFutureDates} 
              classNames={{
                day: "w-9 h-9 text-sm hover:bg-blue-100 rounded-full",
                day_selected: "bg-blue-500 text-white rounded-full",
                day_today: "border border-blue-500",
                
                day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
              }}
              components={{
                PreviousMonthButton: ({ onClick }) => (
                  <button onClick={onClick} className="p-1 hover:bg-gray-200 rounded">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                ),
                NextMonthButton: ({ onClick }) => (
                  <button onClick={onClick} className="p-1 hover:bg-gray-200 rounded">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                ),
              }}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-between items-center w-full mb-2">
              <div className="text-sm font-semibold">{getYear(viewDate)}</div>
              <div>
                <button
                  onClick={() => handleYearChange(-1)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <ArrowUp className="h-4 w-4 rotate-180" />
                </button>
                <button
                  onClick={() => handleYearChange(1)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <ArrowUp className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-1">
              {[
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
              ].map((m, idx) => (
                <button
                  key={m}
                  onClick={() => handleMonthSelect(idx)}
                  className={cn(
                    "text-sm py-1 rounded-md text-center hover:bg-blue-100 w-14 p-3",
                    viewDate.getMonth() === idx && "bg-blue-500 text-white font-bold"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}