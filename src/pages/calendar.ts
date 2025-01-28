declare const HSOverlay: { close: (selector: string) => void };

export function initializeCalendarPage() {
  document.addEventListener("DOMContentLoaded", function () {
    const calendarCustomExample = document.getElementById(
      "calendar-custom",
    ) as HTMLElement;
    let selectedEvent: EventApi | null = null;
    let selectedDateInfo: {
      startStr: string;
      endStr: string | null;
      start: Date;
      end: Date | null;
    } | null = null;

    function addDays(date: Date, days: number): Date {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }

    function formatDate(date: Date): string {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }

    const today = new Date();
    const events = [
      {
        title: "Past Event",
        start: addDays(today, -2).toISOString().split("T")[0],
        classNames: ["fc-event-info"],
      },
      {
        title: "All Day Event",
        start: addDays(today, 2).toISOString().split("T")[0],
        classNames: ["fc-event-info"],
      },
      {
        title: "Long Event",
        start: addDays(today, 2).toISOString().split("T")[0],
        end: addDays(today, 5).toISOString().split("T")[0],
        classNames: ["fc-event-primary"],
      },
      {
        title: "Confirm tech stack",
        start: addDays(today, 0).toISOString().split("T")[0] + "T10:00:00",
        end: addDays(today, 0).toISOString().split("T")[0] + "T18:00:00",
        classNames: ["fc-event-success"],
      },
      {
        groupId: "999",
        title: "Coding session",
        start: addDays(today, 1).toISOString().split("T")[0] + "T16:00:00",
        classNames: ["fc-event-secondary"],
      },
      {
        groupId: "999",
        title: "Coding session",
        start: addDays(today, 8).toISOString().split("T")[0] + "T16:00:00",
        classNames: ["fc-event-secondary"],
      },
      {
        title: "Conference",
        start: addDays(today, 9).toISOString().split("T")[0],
        end: addDays(today, 10).toISOString().split("T")[0],
        classNames: ["fc-event-primary"],
      },
      {
        title: "Meeting",
        start: addDays(today, 9).toISOString().split("T")[0] + "T10:30:00",
        end: addDays(today, 9).toISOString().split("T")[0] + "T12:30:00",
        classNames: ["fc-event-error"],
      },
      {
        title: "Lunch",
        start: addDays(today, 9).toISOString().split("T")[0] + "T12:40:00",
        classNames: ["fc-event-warning"],
      },
      {
        title: "Meeting",
        start: addDays(today, 9).toISOString().split("T")[0] + "T14:30:00",
        classNames: ["fc-event-error"],
      },
      {
        title: "Picnic",
        start: addDays(today, 12).toISOString().split("T")[0],
        classNames: ["fc-event-success"],
      },
      {
        title: "Yoga",
        start: addDays(today, 15).toISOString().split("T")[0],
        classNames: ["fc-event-info"],
      },
      {
        title: "Credit Card Payment",
        start: addDays(today, 23).toISOString().split("T")[0],
        end: addDays(today, 24).toISOString().split("T")[0],
        classNames: ["fc-event-warning"],
      },
      {
        title: "Meeting with client",
        start: addDays(today, 27).toISOString().split("T")[0],
        classNames: ["fc-event-success"],
      },
      {
        start: addDays(today, 17).toISOString().split("T")[0],
        end: addDays(today, 20).toISOString().split("T")[0],
        display: "background",
        classNames: ["fc-event-disabled"],
      },
    ];

    const calendarCustom = new FullCalendar.Calendar(calendarCustomExample, {
      initialView: "dayGridMonth",
      initialDate: today.toISOString().split("T")[0],
      editable: true,
      dragScroll: true,
      dayMaxEvents: 2,
      direction: "ltr", // use 'rtl' for right-to-left language support
      eventResizableFromStart: true,
      selectable: true,
      headerToolbar: {
        left: "prev,next title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
      },
      buttonText: {
        month: "Month",
        week: "Week",
        day: "Day",
        list: "List",
      },
      events: events,
      select: function (info: {
        start: Date;
        end: Date | null;
        startStr: string;
        endStr: string | null;
      }) {
        // Check if the selected range overlaps with the blocked range
        const blockedStart = addDays(today, 17).getTime();
        const blockedEnd = addDays(today, 20).getTime();
        const selectedStart = info.start.getTime();
        const selectedEnd = info.end ? info.end.getTime() : selectedStart;
        if (
          (selectedStart < blockedEnd && selectedEnd > blockedStart) ||
          (selectedEnd > blockedStart && selectedStart < blockedEnd)
        ) {
          alert("Events cannot be added in the blocked date range.");
          calendarCustom.unselect();
          return;
        }
        selectedEvent = null;
        selectedDateInfo = info;
        const modalTitle = document.getElementById("modalTitle");
        if (modalTitle) {
          modalTitle.textContent = `${formatDate(info.start)}`;
        }
        const eventForm = document.getElementById(
          "eventForm",
        ) as HTMLFormElement;
        if (eventForm) {
          eventForm.reset();
        }
        const modalTrigger = document.getElementById("modalTrigger");
        if (modalTrigger) {
          modalTrigger.click();
        }
      },
      eventClick: function (info: { event: EventApi }) {
        selectedEvent = info.event;
        const modalTitle = document.getElementById("modalTitle");
        if (modalTitle) {
          modalTitle.textContent = `${formatDate(info.event.start)}`;
        }
        const eventTitle = document.getElementById(
          "eventTitle",
        ) as HTMLInputElement;
        if (eventTitle) {
          eventTitle.value = info.event.title;
        }
        const modalTrigger = document.getElementById("modalTrigger");
        if (modalTrigger) {
          modalTrigger.click();
        }
      },
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // This will use the 24-hour format
      },
      allDayText: "All day",
    });

    calendarCustom.render();

    const eventForm = document.getElementById("eventForm") as HTMLFormElement;
    if (eventForm) {
      eventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const eventTitle = document.getElementById(
          "eventTitle",
        ) as HTMLInputElement;
        const title = eventTitle ? eventTitle.value : "";
        if (title) {
          if (selectedEvent) {
            selectedEvent.setProp("title", title);
          } else if (selectedDateInfo) {
            calendarCustom.addEvent({
              title: title,
              start: selectedDateInfo.startStr,
              end: selectedDateInfo.endStr,
              allDay: true,
            });
          }
          HSOverlay.close("#calendar-event-modal");
        }
      });
    }
  });
}
