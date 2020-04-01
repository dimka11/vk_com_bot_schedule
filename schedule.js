let schedule_sib = new Map;

function Subject(order, subject, type, teacher, location) {
    this.order = order;
    this.subject = subject;
    this.type = type;
    this.teacher = teacher;
    this.location = location;
    this.toString = function() {
        let order = OrderToTime(this.order);
        return `\n ${order} ${this.subject} (${this.type}) ${this.teacher} ${this.location} \n`
    }
}

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    var millisecsInDay = 86400000;
    return Math.ceil((((this - onejan) /millisecsInDay) + onejan.getDay()+1)/7);
};

function TodayIs() {
    let day_of_week = new Date().getDay();
    let week = (new Date()).getWeek();
    let parity = (week & 1) // 0 - нечетная 1 - четная
    parity ^= 1; // invert
    return {day_of_week, parity};
}

function TomorrowIs() {
    var tomorrow = new Date();
    tomorrow.setDate((new Date().getDate())+1);
    let day_of_week = tomorrow.getDay();
    let week = tomorrow.getWeek();
    let parity = (week & 1) // 0 - нечетная 1 - четная
    parity ^= 1; // invert
    return {day_of_week, parity};
}

function OrderToTime(order){
    switch(order) {
        case 1: return '8:00-9:35';
        break;
        case 2: return '9:45-11:20';
        break;
        case 3: return '11:30-13:05';
        break;
        case 4: return '13:45-15:20';
        break;
        case 5: return '15:30-17:05';
        break;
    }
}

module.exports = {
    get_exams: function () {
        return exams_sch();
    },
    get_timel: function() {
        return timel();
    },
    get_today: function () {
        SchStore();
        let today = Object.values(TodayIs());
        return schedule_sib.get(today[0]*10 + today[1]);
    },
    get_tommorow: function () {
        SchStore();
        let tomorrow = Object.values(TomorrowIs());
        return schedule_sib.get(tomorrow[0]*10 + tomorrow[1]);
    },
}

function SchStore() {
    let _20 = new Array();
    _20.push(new Subject(0, 'Правоведение', 'Практика', 'Шишкин В.В.,', '10-202-б'));
    _20.push(new Subject(0, 'Теория организации и управления', 'Практика', 'Петренко И.А.', '10-202-б'));
    schedule_sib.set(20, _20);

    let _30 = new Array();
    _30.push(new Subject(2, 'Администрирование локальных вычислительных сетей', 'Практика', 'Гусс С.В', '10-206-б'));
    schedule_sib.set(30, _30);

    let _40 = new Array();
    _40.push(new Subject(2, 'Алгоритмы кодировки и сжатия', 'Практика', 'Горев А.И.', '10-206-б'));
    _40.push(new Subject(3, 'Алгоритмы кодировки и сжатия', 'Лекция', 'Горев А.И', '10-209-б'));
    schedule_sib.set(40, _40);

    let _50 = new Array();
    _50.push(new Subject(2, 'Сети и телекоммуникации', 'лаб', 'Опарина Т.М.', '10-206-а'));
    _50.push(new Subject(3, 'Сети и телекоммуникации', 'лаб', 'Опарина Т.М.', '10-206-а'));
    _50.push(new Subject(4, 'Схемотехника ЭВМ', 'лаб', 'Вахний Т.В.', '10-100-б'));
    schedule_sib.set(50, _50);
    
    /// new Subject(0, '', '', '', '')
    let _21 = new Array();
    _20.push(new Subject(2, 'Схемотехника', 'Лекция', 'Вахний Т.В', '10-107-a'));
    _20.push(new Subject(3, 'Сети и телекоммуникации', 'Лекция', 'Опарина Т.М', '10-106-б'));
    _20.push(new Subject(4, 'Теория организации и управления', 'Практика', 'Петренко И.А.', '10-202-б'));
    schedule_sib.set(21, _21);

    let _31 = new Array();
    _31.push(new Subject(2, 'Администрирование локальных вычислительных сетей', 'Практика', 'Гусс С.В.', '10-206-a'));
    _31.push(new Subject(3, 'Администрирование локальных вычислительных сетей', 'Лекция', 'Гусс С.В', '10-107-a'));
    schedule_sib.set(31, _31);

    let _41 = new Array();
    _41.push(new Subject(2, 'Правоведение', 'Шишкин В.В.', 'лек', '10-207-б'));
    _41.push(new Subject(3, 'Параллельные вычисления', 'прак', 'Вакилов А.Н', '10-206-б'));
    _41.push(new Subject(4, 'Параллельные вычисления', 'лек', 'Вакилов А.Н.', '10-107-а'));
    schedule_sib.set(41, _41);

    let _51 = new Array();
    _51.push(new Subject(3, 'Сети и телекоммуникации', 'лаб', 'Опарина Т.М.', '10-206-а'));
    _51.push(new Subject(4, 'Схемотехника ЭВМ', 'лаб', 'Вахний Т.В.', '10-100-б'));
    schedule_sib.set(51, _51);
}

function timel() {
    function Timel(order, time_string) {
        this.order = order;
        this.time_string = time_string;
        this.toString = function () {
            return `${order} - ${time_string} \n`
        }
    }

    let timels = [];
    timels.push(new Timel(1, '8:00-9:35'));
    timels.push(new Timel(2, '9:45-11:20'));
    timels.push(new Timel(3, '11:30-13:05'));
    timels.push(new Timel(4, '13:45-15:20'));
    timels.push(new Timel(5, '15:30-17:05'));

    return timels.toString();
}


function exams_sch() {  
    function Exam(date_time, type, name, teacher, location) {
        this.date_time = date_time;
        this.type = type;
        this.name = name;
        this.teacher = teacher;
        this.location = location;

        this.toString = function () {
            return `${this.date_time}  ${this.type} ${this.name} ${this.teacher} ${this.location}\n`
        }
      }

    let exam1 = new Exam(new Date(2020, 09, 01, 10, 00), 'Консультация', 'МПС', 'Гусс С.В.', '10-204-б');
    let exam2 = new Exam(new Date(2020, 10, 01, 09, 00), 'Экзамен', 'МПС', 'Гусс С.В.', '10-204-б');
    let exams = [exam1, exam2];

    return exams.toString();
}