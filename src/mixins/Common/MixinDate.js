export default {
  data() {
    return {
      dateDeclension: ['день', 'дня', 'дней'],
    }
  },

  methods: {
    $_datesDifference(startDate, endDate = new Date()) {
      const start = new Date(startDate);
      const end = new Date();
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      return Math.ceil(timeDiff / (1000 * 3600 * 24));
    },
  }
}