import React, { useState } from 'react';


const DateWithNewFormat = DateTimePretty(dateToNewFormat, DateTime);

function DateTimePretty(func, Component) {
    return function (props) {
        let { date } = props;
        let newFormat = func(date);
        return Component.apply(this, [newFormat])
    }
}

function dateToNewFormat(date) {
    let now = Date.now();
    let ISODate = date.replace(' ', 'T');
    let propsDate = Date.parse(ISODate);

    let differenceOfDates = (now - propsDate) / 1000 / 60;
    let newFormat = { date: '' };

    if (differenceOfDates < 60) {
        newFormat.date = '12 минут назад'
    } else if (differenceOfDates > 60 && differenceOfDates < 60 * 24) {
        newFormat.date = '5 часов назад'
    } else {
        newFormat.date = `${(differenceOfDates / 60 / 24).toFixed(0)} дней назад`
    }

    return newFormat
}

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            <DateWithNewFormat date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2019-10-01 18:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}