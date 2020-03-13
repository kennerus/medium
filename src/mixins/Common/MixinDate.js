export default {
  data() {
    return {
      dateDeclension: ['день', 'дня', 'дней'],
      hourDeclension: ['час', 'часа', 'часов'],
      minutesDeclension: ['минута', 'минуты', 'минут'],
    }
  },

  methods: {
    $_datesDifference(startDate, endDate = new Date()) {
      const start = new Date(startDate);
      const end = new Date();
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      const msInHour = 3600000;
      const msInDay = msInHour * 24;

      let difference = '';
      let declension = [];

      if (timeDiff < msInDay) {
        if (timeDiff < msInHour) {
          difference = Math.ceil(timeDiff / (1000 * 60));
          declension = this.minutesDeclension;
        } else {
          difference = Math.ceil(timeDiff / msInHour);
          declension = this.hourDeclension;
        }
      } else {
        difference = Math.ceil(timeDiff / msInDay);
        declension = this.dateDeclension;
      }

      return {
        difference,
        declension,
      }
    },

    $_getCurrentDate() {
      return new Date().toISOString();
    },
  }
}