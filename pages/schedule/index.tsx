import * as React from 'react';
import { useState, useEffect } from 'react';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  TodayButton,
  Resources,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles, Theme, createStyles } from '@material-ui/core';
import { grey, indigo, blue, teal, purple, red, orange } from '@material-ui/core/colors';
import Paper from '@material-ui/core/Paper';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { WithStyles } from '@material-ui/styles';
import classNames from 'clsx';
import { GetServerSideProps } from 'next';
import { RequestHelper } from '../../lib/request-helper';
import { StayCurrentLandscapeTwoTone } from '@material-ui/icons';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import PinDrop from '@material-ui/icons/PinDrop';
import ClockIcon from '@material-ui/icons/AccessTime';
import Backpack from '@material-ui/icons/LocalMall';
import Description from '@material-ui/icons/BorderColor';
import firebase from 'firebase';

const resources = [
  {
    fieldName: 'location',
    title: 'Location',
    instances: [
      { id: 'Room 1', text: 'Room 1', color: indigo },
      { id: 'Room 2', text: 'Room 2', color: blue },
      { id: 'Room 3', text: 'Room 3', color: teal },
    ],
  },
  {
    fieldName: 'Event',
    title: 'Type',
    instances: [
      { id: 1, text: 'Event', color: red },
      { id: 2, text: 'Sponsor', color: blue },
      { id: 3, text: 'Tech Talk', color: indigo },
      { id: 4, text: 'Workshop', color: purple },
      { id: 5, text: 'Social', color: orange },
    ],
  },
];

const styles = ({ palette }: Theme) =>
  createStyles({
    appointment: {
      borderRadius: 0,
      borderBottom: 0,
    },

    EventTypeAppointment: {
      border: `2px solid ${red[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 1px ${red[400]} `,
    },
    SponsorTypeAppointment: {
      border: `2px solid ${orange[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${orange[500]} `,
    },
    TechTalkTypeAppointment: {
      border: `2px solid ${indigo[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${indigo[500]} `,
    },
    WorkshopTypeAppointment: {
      border: `2px solid ${purple[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${purple[500]} `,
    },
    SocialTypeAppointment: {
      border: `2px solid ${blue[500]}`,
      backgroundColor: `${grey[900]}`,
      borderRadius: 8,
      boxShadow: ` 0 0 16px 4px ${blue[500]} `,
    },
    weekEndCell: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
      '&:focus': {
        backgroundColor: alpha(palette.action.disabledBackground, 0.04),
      },
    },
    weekEndDayScaleCell: {
      backgroundColor: alpha(palette.action.disabledBackground, 0.06),
    },
    text: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    content: {
      opacity: 0.7,
    },
    container: {
      width: '100%',
      lineHeight: 1.2,
      height: '100%',
    },
  });

type AppointmentProps = Appointments.AppointmentProps & WithStyles<typeof styles>;
type AppointmentContentProps = Appointments.AppointmentContentProps & WithStyles<typeof styles>;
type TimeTableCellProps = MonthView.TimeTableCellProps & WithStyles<typeof styles>;
type DayScaleCellProps = MonthView.DayScaleCellProps & WithStyles<typeof styles>;

const isWeekEnd = (date: Date): boolean => date.getDay() === 0 || date.getDay() === 6;
const defaultCurrentDate = new Date(2021, 10, 13, 9, 0);
{
  /* !change */
}
// const defaultCurrentDate = new Date();

const DayScaleCell = withStyles(styles)(
  ({ startDate, classes, ...restProps }: DayScaleCellProps) => (
    <MonthView.DayScaleCell
      className={classNames({
        [classes.weekEndDayScaleCell]: isWeekEnd(startDate),
      })}
      startDate={startDate}
      {...restProps}
    />
  ),
);

const TimeTableCell = withStyles(styles)(
  ({ startDate, classes, ...restProps }: TimeTableCellProps) => (
    <MonthView.TimeTableCell
      className={classNames({
        [classes.weekEndCell]: isWeekEnd(startDate),
      })}
      startDate={startDate}
      {...restProps}
    />
  ),
);

// #FOLD_BLOCK
const AppointmentContent = withStyles(styles, { name: 'AppointmentContent' })(
  ({
    classes,
    data,
    ...restProps
  }: // #FOLD_BLOCK
  AppointmentContentProps) => {
    let Event = 'Event';
    if (data.Event === 2) Event = 'Sponsor';
    if (data.Event === 3) Event = 'Tech Talk';
    if (data.Event === 4) Event = 'Workshop';
    if (data.Event === 5) Event = 'Social';

    return (
      <Appointments.AppointmentContent {...restProps} data={data}>
        <div className={classes.container}>
          <div className={classes.text}>{data.title}</div>
          <div className={classNames(classes.text, classes.content)}>{`Type: ${Event}`}</div>
          <div className={classNames(classes.text, classes.content)}>
            {`Location: ${data.location}`}
          </div>
        </div>
      </Appointments.AppointmentContent>
    );
  },
);

export default function Calendar(props: { scheduleCard: ScheduleEvent[] }) {
  const [eventData, setEventData] = useState({
    title: '',
    speakers: '',
    date: '',
    time: '',
    page: '',
    description: '',
    location: '',
  });

  const Appointment = withStyles(styles)(
    ({ onClick, classes, data, ...restProps }: AppointmentProps) => (
      <Appointments.Appointment
        {...restProps}
        className={classNames({
          [classes.EventTypeAppointment]: data.Event === 1,
          [classes.SponsorTypeAppointment]: data.Event === 2,
          [classes.TechTalkTypeAppointment]: data.Event === 3,
          [classes.WorkshopTypeAppointment]: data.Event === 4,
          [classes.SocialTypeAppointment]: data.Event === 5,
          [classes.appointment]: true,
        })}
        data={data}
        onClick={() => changeEventData(data)}
      />
    ),
  );

  const changeEventData = (data) => {
    const startDate = new firebase.firestore.Timestamp(data.startTimestamp._seconds, 0).toDate();
    const endDate = new firebase.firestore.Timestamp(data.endTimestamp._seconds, 0).toDate();
    //first match extracts day abbreviation
    //second match extracts month abbreviation and the number day of the month
    var dayString =
      startDate.toString().match(/^[\w]{3}/)[0] +
      ', ' +
      startDate.toString().match(/^\w+ (\w{3} \d{1,2})/)[1];

    var speakerString = '';
    if (data.speakers !== undefined && data.speakers !== null && data.speakers.length !== 0) {
      if (data.speakers.length == 2) {
        speakerString = `Hosted by ${data.speakers[0]} & ${data.speakers[1]}`;
      } else if (data.speakers.length == 1) {
        speakerString = `Hosted by ${data.speakers[0]}`;
      } else {
        speakerString = 'Hosted by ';
        for (var i = 0; i < data.speakers.length; i++) {
          if (i === data.speakers.length - 1) {
            speakerString += 'and ' + data.speakers[i];
          } else {
            speakerString += data.speakers[i] + ', ';
          }
        }
      }
    }
    var timeString = `${(startDate.getHours() + 24) % 12 || 12}:${
      startDate.getMinutes() < 10 ? '0' : ''
    }${startDate.getMinutes()} ${startDate.getHours() < 12 ? 'AM' : 'PM'} - ${
      (endDate.getHours() + 24) % 12 || 12
    }:${endDate.getMinutes() < 10 ? '0' : ''}${endDate.getMinutes()} ${
      endDate.getHours() < 12 ? 'AM' : 'PM'
    }`;

    //setting new event data based on event clicked
    setEventData({
      title: data.title,
      speakers: speakerString,
      date: dayString,
      time: timeString,
      page: data.page,
      description: data.description,
      location: data.location,
    });
  };

  return (
    <>
      <div className="text-6xl font-black p-6">Schedule</div>
      <div className="flex flex-wrap lg:justify-between px-6 h-[75vh]">
        {/* Calender */}
        <div className="overflow-y-auto overflow-x-hidden lg:w-[62%] w-full h-full border-2 border-black rounded-md">
          <Paper>
            <Scheduler data={props.scheduleCard}>
              <ViewState defaultCurrentDate={defaultCurrentDate} />

              <DayView startDayHour={8} endDayHour={24} intervalCount={1} />

              <Appointments
                appointmentComponent={Appointment}
                appointmentContentComponent={AppointmentContent}
              />
              {/* <Resources data={resources} /> */}

              <Toolbar />
              <DateNavigator />
              <ViewSwitcher />
              <TodayButton />
            </Scheduler>
          </Paper>
        </div>

        {/* Event info card */}
        <div className="overflow-y-auto flex flex-col justify-between lg:w-[36%] w-full h-full lg:my-0 my-2 border-2 border-black rounded-md bg-white p-4">
          <section>
            {eventData.title === '' ? (
              <div className="text-2xl">Click on an event for more info</div>
            ) : (
              <div />
            )}
            <h1 className="md:text-4xl text-2xl font-bold">{eventData.title}</h1>
            <div className="md:text-lg text-sm mb-4">{eventData.speakers}</div>

            {/* Shows card info if user has clicked on an event */}
            <div className={eventData.title === '' ? 'hidden' : 'inline'}>
              <div className="grid grid-cols-2 gap-y-2 md:my-8 my-6 md:text-lg text-sm">
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<CalendarIcon style={{ fontSize: 'medium', margin: '2px' }} />}
                    Date
                  </p>
                  <p>{eventData.date}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<PinDrop style={{ fontSize: 'medium', margin: '2px' }} />}
                    Location
                  </p>
                  <p>{eventData.location}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<ClockIcon style={{ fontSize: 'large', margin: '2px' }} />}
                    Time
                  </p>
                  <p>{eventData.time}</p>
                </div>
                <div className="">
                  <p className="flex items-center font-semibold">
                    {<Backpack style={{ fontSize: 'medium', margin: '2px' }} />}
                    Page
                  </p>
                  <p>{eventData.page}</p>
                </div>
              </div>

              <div className="lg:text-base text-sm">
                <p className="flex items-center font-semibold">
                  {<Description style={{ fontSize: 'medium', margin: '2px' }} />}
                  Description
                </p>
                <p>{eventData.description}</p>
              </div>
            </div>
          </section>

          <div className="text-right">*All events are given in CST</div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0] || 'http';
  const { data: scheduleData } = await RequestHelper.get<ScheduleEvent[]>(
    `${protocol}://${context.req.headers.host}/api/schedule`,
    {},
  );
  return {
    props: {
      scheduleCard: scheduleData,
    },
  };
};
