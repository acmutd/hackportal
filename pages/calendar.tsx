import * as React from 'react';
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
import { fade } from '@material-ui/core/styles/colorManipulator';
import { WithStyles } from '@material-ui/styles';
import classNames from 'clsx';

const appointments = [
  {
    title: 'Sponsor Fair',
    startDate: new Date(2021, 10, 13, 9, 30),
    endDate: new Date(2021, 10, 13, 11, 0),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Team Building Event',
    startDate: new Date(2021, 10, 13, 12, 0),
    endDate: new Date(2021, 10, 13, 12, 30),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Squid Game 1',
    startDate: new Date(2021, 10, 13, 13, 30),
    endDate: new Date(2021, 10, 13, 14, 0),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Squid Game 2',
    startDate: new Date(2021, 10, 13, 15, 45),
    endDate: new Date(2021, 10, 13, 16, 15),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Squid Game 3',
    startDate: new Date(2021, 10, 13, 17, 45),
    endDate: new Date(2021, 10, 13, 18, 15),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Casual Game Hangout IEEE',
    startDate: new Date(2021, 10, 13, 14, 30),
    endDate: new Date(2021, 10, 13, 15, 30),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'So You Think You Can Fly? with American Airlines',
    startDate: new Date(2021, 10, 13, 18, 30),
    endDate: new Date(2021, 10, 13, 19, 30),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'GS Watch Party with Goldman Sachs',
    startDate: new Date(2021, 10, 13, 20, 30),
    endDate: new Date(2021, 10, 13, 21, 15),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Game Tournament Smash',
    startDate: new Date(2021, 10, 13, 22, 30),
    endDate: new Date(2021, 10, 13, 23, 15),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Lunch',
    startDate: new Date(2021, 10, 13, 12, 0),
    endDate: new Date(2021, 10, 13, 13, 0),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Dinner',
    startDate: new Date(2021, 10, 13, 19, 30),
    endDate: new Date(2021, 10, 13, 20, 15),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Hacker Check-in',
    startDate: new Date(2021, 10, 13, 9, 0),
    endDate: new Date(2021, 10, 13, 11, 0),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Opening Ceremony',
    startDate: new Date(2021, 10, 13, 11, 0),
    endDate: new Date(2021, 10, 13, 11, 30),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Walk-in Registration',
    startDate: new Date(2021, 10, 13, 10, 0),
    endDate: new Date(2021, 10, 13, 11, 0),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Hacking Starts',
    startDate: new Date(2021, 10, 13, 12, 0),
    endDate: new Date(2021, 10, 13, 12, 30),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Workshop with GDSC',
    startDate: new Date(2021, 10, 13, 13, 45),
    endDate: new Date(2021, 10, 13, 14, 30),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Full-stack Development with Next.js by American Airlines',
    startDate: new Date(2021, 10, 13, 15, 0),
    endDate: new Date(2021, 10, 13, 15, 45),
    Event: 4,
    location: 'ECSW',
  },
  {
    title:
      'Understanding Digital Innovation in FinTech: The Effects of Social Media and Cloud Computing by Goldman Sachs',
    startDate: new Date(2021, 10, 13, 16, 15),
    endDate: new Date(2021, 10, 13, 17, 0),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Workshop with EOG',
    startDate: new Date(2021, 10, 13, 17, 30),
    endDate: new Date(2021, 10, 13, 18, 15),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Github Actions with State Farm',
    startDate: new Date(2021, 10, 13, 18, 45),
    endDate: new Date(2021, 10, 13, 19, 30),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Workshop with AIS',
    startDate: new Date(2021, 10, 13, 20, 0),
    endDate: new Date(2021, 10, 13, 20, 45),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Freeplay:PS4 SFV + DB FZ Meta Quest VR Games',
    startDate: new Date(2021, 10, 13, 21, 30),
    endDate: new Date(2021, 10, 13, 22, 30),
    Event: 5,
    location: 'ECSW',
  },
  {
    title: 'Arduino Crash Course by MakerSpace',
    startDate: new Date(2021, 10, 13, 13, 0),
    endDate: new Date(2021, 10, 13, 13, 45),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: '7 Steps to Problem-Solving Methodology Workshop by 180DC',
    startDate: new Date(2021, 10, 13, 14, 15),
    endDate: new Date(2021, 10, 13, 15, 0),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'LinkedIn Workshop by AKPsi',
    startDate: new Date(2021, 10, 13, 15, 45),
    endDate: new Date(2021, 10, 13, 16, 30),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Pitch Perfect by E-Club',
    startDate: new Date(2021, 10, 13, 16, 45),
    endDate: new Date(2021, 10, 13, 17, 30),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Building a Blockchain dApp by UTD Blockchain',
    startDate: new Date(2021, 10, 13, 18, 0),
    endDate: new Date(2021, 10, 13, 18, 45),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Unity Coding Tips and Tricks by SGDA',
    startDate: new Date(2021, 10, 13, 19, 15),
    endDate: new Date(2021, 10, 13, 20, 0),
    Event: 4,
    location: 'ECSW',
  },
  {
    title: 'Breakfast',
    startDate: new Date(2021, 10, 14, 9, 0),
    endDate: new Date(2021, 10, 14, 9, 30),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Lunch',
    startDate: new Date(2021, 10, 14, 12, 0),
    endDate: new Date(2021, 10, 14, 13, 15),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Hacking Ends',
    startDate: new Date(2021, 10, 14, 12, 0),
    endDate: new Date(2021, 10, 14, 12, 30),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Project Expo',
    startDate: new Date(2021, 10, 14, 13, 0),
    endDate: new Date(2021, 10, 14, 14, 30),
    Event: 1,
    location: 'ECSW',
  },
  {
    title: 'Closing Ceremony',
    startDate: new Date(2021, 10, 14, 15, 0),
    endDate: new Date(2021, 10, 14, 16, 30),
    Event: 1,
    location: 'ECSW',
  },
];

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
      backgroundColor: fade(palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: fade(palette.action.disabledBackground, 0.04),
      },
      '&:focus': {
        backgroundColor: fade(palette.action.disabledBackground, 0.04),
      },
    },
    weekEndDayScaleCell: {
      backgroundColor: fade(palette.action.disabledBackground, 0.06),
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

const Appointment = withStyles(styles)(({ classes, data, ...restProps }: AppointmentProps) => (
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
  />
));

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

export default function Calendar() {
  return (
    <Paper>
      <Scheduler data={appointments}>
        <ViewState defaultCurrentDate={defaultCurrentDate} />

        <DayView startDayHour={8} endDayHour={24} intervalCount={2} />

        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
        />
        <Resources data={resources} />

        <AppointmentTooltip showCloseButton />
        <Toolbar />
        <DateNavigator />
        <ViewSwitcher />
        <TodayButton />
      </Scheduler>
    </Paper>
  );
}
