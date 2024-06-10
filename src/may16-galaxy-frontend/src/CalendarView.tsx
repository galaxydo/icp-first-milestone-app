import { h } from 'preact';
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";

const CALENDAR_EVENT_STYLE = {
  "BLUE": "bg-blue-200 dark:bg-blue-600 dark:text-blue-100",
  "GREEN": "bg-green-200 dark:bg-green-600 dark:text-green-100",
  "PURPLE": "bg-purple-200 dark:bg-purple-600 dark:text-purple-100",
  "ORANGE": "bg-orange-200 dark:bg-orange-600 dark:text-orange-100",
  "PINK": "bg-pink-200 dark:bg-pink-600 dark:text-pink-100",
  "MORE": "hover:underline cursor-pointer font-medium "
}


const THEME_BG = CALENDAR_EVENT_STYLE;

function CalendarView({ calendarEvents, addNewEvent, openDayDetail }) {
  const today = moment().startOf('day');
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const firstDayOfMonth = moment().startOf('month');
  const currMonth = moment(today).format("MMM-yyyy");

  const allDaysInMonth = () => {
    let start = moment(firstDayOfMonth).startOf('week');
    let end = moment(moment(firstDayOfMonth).endOf('month')).endOf('week');
    var days = [];
    var day = start;
    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    return days;
  };

  return (
    <div className="w-full bg-base-100 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex justify-normal gap-2 sm:gap-4">
          <p className="font-semibold text-xl w-48">
            {moment(firstDayOfMonth).format("MMMM yyyy").toString()}<span className="text-xs ml-2">Beta</span>
          </p>
          <button className="btn btn-square btn-sm btn-ghost">
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <button className="btn btn-sm btn-ghost normal-case">
            Current Month
          </button>
          <button className="btn btn-square btn-sm btn-ghost">
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>
        <div>
          <button className="btn btn-sm btn-ghost btn-outline normal-case" onClick={() => addNewEvent()}>Add New Event</button>
        </div>
      </div>
      <div className="my-4 divider" />
      <div className="grid grid-cols-7 gap-6 sm:gap-12 place-items-center">
        {weekdays.map((day, key) => (
          <div className="text-xs capitalize" key={key}>
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 mt-1 place-items-center">
        {allDaysInMonth().map((day, idx) => (
          <div key={idx} className={colStartClasses[moment(day).day().toString()] + " border border-solid w-full h-28"}>
            <p className={`inline-block flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300`}>
              {moment(day).format("D")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
