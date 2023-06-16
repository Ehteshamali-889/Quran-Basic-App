import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'en';

const EventCalendar = () => {
  const events = [
    { date: '2023-06-29', eventName: 'Eid al-Adha', details: 'Festival of Sacrifice' },
    { date: '2023-07-19', eventName: 'Islamic New Year', details: 'Islamic New Year celebration' },
    { date: '2024-04-9', eventName: 'Eid al-Fitr', details: 'Festival marking the end of Ramadan' },
    // Add more events as needed
  ];

  const markedDates = {};
  events.forEach((event) => {
    markedDates[event.date] = { marked: true };
  });

  const renderEventMarker = () => (
    <View style={styles.eventMarker} />
  );

  const renderDayContent = (day) => {
    const { dateString } = day;
    const event = events.find((event) => event.date === dateString);

    if (event) {
      return (
        <View style={styles.eventContainer}>
          {renderEventMarker()}
        </View>
      );
    }

    return null;
  };

  const renderEventCards = () => {
    return events.map((event, index) => (
      <View key={index} style={styles.eventCard}>
        <Text style={styles.eventName}>{event.eventName}</Text>
        <Text style={styles.eventDate}>{event.date}</Text>
        <Text style={styles.eventDetails}>{event.details}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={markedDates}
        renderDayContent={renderDayContent}
        theme={{
          calendarBackground: '#FFFFFF',
          textSectionTitleColor: '#333333',
          todayTextColor: '#000000',
          dayTextColor: '#333333',
          selectedDayTextColor: '#FFFFFF',
          monthTextColor: '#333333',
          textDisabledColor: '#BBBBBB',
          arrowColor: '#000000',
          indicatorColor: '#000000',
        }}
      />
      <View style={styles.eventCardsContainer}>{renderEventCards()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  eventContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventMarker: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000000',
  },
  eventCardsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  eventCard: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:'black'
  },
  eventDate: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  eventDetails: {
    fontSize: 14,
    color: '#333333',
  },
});

export default EventCalendar;
