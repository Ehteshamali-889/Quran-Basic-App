import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/ar'; // Import the Arabic locale for moment

// Set the Arabic locale for moment
moment.locale('ar');

LocaleConfig.locales['ar'] = {
  monthNames: [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الآخر',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ],
  monthNamesShort: [
    'مح',
    'صف',
    'رب١',
    'رب٢',
    'جم١',
    'جم٢',
    'رج',
    'شع',
    'رمض',
    'شو',
    'ذوق',
    'ذوح',
  ],
  dayNames: [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت',
  ],
  dayNamesShort: ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'],
  today: 'اليوم',
};
LocaleConfig.defaultLocale = 'ar';

const IslamicCalendar = () => {
  const convertToIslamicDate = (date) => {
    return moment(date).format('iD/iM');
  };

  const renderDayContent = (day) => {
    const islamicDate = convertToIslamicDate(day.dateString);
    return (
      <View style={styles.dayContainer}>
        <Text style={styles.dayText}>{islamicDate}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
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
        locale="ar" // Set the calendar locale to Arabic
        renderDayContent={renderDayContent} // Render Islamic date
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#333333',
  },
});

export default IslamicCalendar;
